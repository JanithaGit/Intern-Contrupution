/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/20/20
 * Time: 6:09 PM
 */
import React, {Component} from 'react';
import './Auth.scss';
import {Dropdown, Modal} from "semantic-ui-react";
import connect from "react-redux/es/connect/connect";
import SectionPolygon from "../../SectionPolygon/SectionPolygon";
import {Button} from "reactstrap";
import Flatpickr from "react-flatpickr";
import * as dropdownConst from '../../../utils/dropdownConst';
import * as commonFunc from '../../../utils/commonFunc';
import * as validator from '../../../utils/validator';
import moment from "moment";
import md5 from 'md5';
import * as constants from "../../../const/constants";
import {withRouter} from "react-router";
import * as authService from "../../../services/auth";
import * as actionSpinnerCreator from "../../../store/domain/spinner/action";
import swal from "sweetalert";
import Logo from "../../../assets/img/logo/logo.png";
import Cookies from "js-cookie";

class App extends Component {
    state = {
        name: '',gender: '',school: '',address: '',email: '',mobile: '',grade: '',district: '',province: '',password: '',confPassword: '',otp:'',isOtp:false,expireTime:30,
        // name: 'Tharindu',gender: 'MALE',school: 'KV',address: 'Kaluthara',email: 'tharindud@ceyentra.com',mobile: '0716630903',grade: '2020 O/L',district: 'Kalutara',province: 'Western Province',password: 'Admin@123',confPassword: 'Admin@123',otp:'',isOtp:true,expireTime:30,
        dob: ''
    };
    textOnChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        if (name === "name" || name === "school" || name === "address") value = value.trim() !== "" ? value.replace(/^./, value[0].toUpperCase()) : "";
        if (name === "mobile" || name === "otp") if (!validator.onlyDigit.test(value) && value.length !== 0) return;
        if (name === "email") value = value.toLowerCase();
        this.setState({[name]: value});
    };
    dropdownOnChange = (name) => (e, {value}) => {
        this.setState({[name]: value});
    };
    setModalHandler = (str) => {
        if(str === "LOGIN"){
            this.props.history.push(`${constants.BASE_ROUTE}${constants.AUTH_LOGIN_ROUTE}`);
            return;
        }
        this.goToHomeHandler();
    };
    goToHomeHandler = async() => {
        await Cookies.remove(constants.ACCESS_TOKEN);
        await Cookies.remove(constants.REFRESH_TOKEN);
        this.props.history.push(`${constants.BASE_ROUTE}${constants.HOME_INSTITUTE_ROUTE}`);
    };
    registerHandler = async (status) => {
        let {isOtp} = this.state;
        const obj = {
            ...this.state,
            dob: moment(this.state.dob).format("YYYY-MM-DD"),
            password: md5(this.state.password),
            confPassword: md5(this.state.confPassword),
        };

        if(!isOtp || status){
            this.props.spinnerHandler(true);
            await authService.userRegisterCheck(obj)
                .then(response => {
                    this.props.spinnerHandler(false);
                    commonFunc.notifyMessage(response.message,response.status);
                    if(response.success){
                        // this.setState({isOtp:true,expireTime:30})
                        this.setModalHandler("LOGIN")
                    }
                });
            return;
        }

        this.props.spinnerHandler({isSpin:true,type:5});
        await authService.userRegister(obj)
            .then(response => {
                this.props.spinnerHandler(false);
                commonFunc.notifyMessage(response.message,response.status);
                if(response.success){
                    this.setModalHandler("LOGIN")
                }
            })
    };
    componentDidMount(){
        this.timer = setInterval(this.countDown, 1000);
    }
    countDown = () => {
        let {isOtp,expireTime} = this.state;
        if(isOtp && expireTime > 0){
            this.setState({expireTime:(expireTime-1)})
        }
    };
    componentWillUnmount(){
        clearInterval(this.timer);
    }

    getOtpHandler = () => {

        let {name, gender,dob, school, address, email, mobile, grade, district, province, password, confPassword,isOtp,otp} = this.state;
        name.trim() === "" ? commonFunc.notifyMessage("Full name cannot be empty") :
            dob === "" ? commonFunc.notifyMessage("Date of birth cannot be empty") :
            gender === "" ? commonFunc.notifyMessage("Gender cannot be empty") :
                school.trim() === "" ? commonFunc.notifyMessage("School cannot be empty") :
                    address.trim() === "" ? commonFunc.notifyMessage("Address cannot be empty") :
                        !validator.emailRegex.test(email) ? commonFunc.notifyMessage("Please enter valid email address") :
                            !validator.mobileNumValidator(mobile, 1) ? commonFunc.notifyMessage("Please enter valid mobile number. (Ex: 07XXXXXXXX)") :
                                grade === "" ? commonFunc.notifyMessage("Grade cannot be empty") :
                                    province === "" ? commonFunc.notifyMessage("Province cannot be empty") :
                                        district === "" ? commonFunc.notifyMessage("District cannot be empty") :
                                            !validator.passwordRegex.test(password) ? commonFunc.notifyMessage("Password must contain at least 8 characters, including UPPER/LOWERCASE/SPECIAL_CHARACTER and NUMBERS") :
                                                password !== confPassword ? commonFunc.notifyMessage("Passwords do not match") :
                                                    isOtp && otp.trim() === "" ? commonFunc.notifyMessage("OTP Code cannot be empty") :
                                                        swal({
                                                            title: constants.ALERT_TEXT,
                                                            icon: null,
                                                            closeOnClickOutside: false,
                                                            buttons: {
                                                                cancel: 'No',
                                                                dangerMode: {text: "Yes", value: "action", className: "okay-btn"}
                                                            },
                                                        }).then((value) => {
                                                            switch (value) {
                                                                case "action":
                                                                    this.registerHandler();
                                                                    break;
                                                                default:
                                                                    break;
                                                            }
                                                        });

    };

    render() {
        let {name, gender, dob, school, address, email, mobile, grade, district, province, password, confPassword,isOtp,otp,expireTime} = this.state;
        return (
            <Modal size={"tiny"} open={true} centered={true}
                   className={"auth-modal"}>
                <Modal.Header>
                    <div className={"logo-wrapper"}>
                        <img
                            className={"logo-img"}
                            alt="..."
                            src={Logo}
                        />
                    </div>
                    <p className={"lecture-intro login-title"}>Register a new student</p>
                    <SectionPolygon/>
                </Modal.Header>

                {
                    !isOtp ?
                        <Modal.Content scrolling>

                            <p className={"p-tag"}>Full name</p>
                            <input className={"form-control teach-input"} name={"name"} value={name}
                                   placeholder={"Enter your name"} onChange={this.textOnChange}/>

                            <p className={"p-tag"}>Date of birth</p>
                            <Flatpickr
                                className="form-control teach-input"
                                value={dob}
                                options={{maxDate: new Date()}}
                                placeholder='Select your birthday'
                                onChange={date => {
                                    this.setState({dob: date[0]})}
                                }
                            />
                            <p className={"p-tag"}> Gender </p>
                            <Dropdown
                                placeholder='Select gender' className={"form-control teach-input"} fluid search selection
                                clearable selectOnBlur={false}
                                options={dropdownConst.gender} value={gender} onChange={this.dropdownOnChange('gender')}/>

                            <p className={"p-tag"}>School</p>
                            <input className={"form-control teach-input"} name={"school"} value={school}
                                   placeholder={"Enter your school"} onChange={this.textOnChange}/>

                            <p className={"p-tag"}>Address</p>
                            <textarea className={"form-control teach-input"} name={"address"} value={address}
                                      placeholder={"Enter your address"} onChange={this.textOnChange}/>

                            <p className={"p-tag"}>Email address</p>
                            <input className={"form-control teach-input"} name={"email"} type={"email"} value={email}
                                   placeholder={"Enter your email"} onChange={this.textOnChange}/>

                            <p className={"p-tag"}>Mobile number</p>
                            <input className={"form-control teach-input"} name={"mobile"} value={mobile}
                                   placeholder={"Enter your mobile number"} onChange={this.textOnChange}/>

                            <p className={"p-tag"}>Grade (or year of exam)</p>
                            <Dropdown
                                placeholder='Select grade' className={"form-control teach-input"} fluid search selection
                                clearable selectOnBlur={false} value={grade} onChange={this.dropdownOnChange('grade')}
                                options={dropdownConst.grades}
                            />

                            <p className={"p-tag"}> Province </p>
                            <Dropdown
                                placeholder='Select province' className={"form-control teach-input"} fluid search selection
                                clearable selectOnBlur={false} value={province} onChange={this.dropdownOnChange('province')}
                                options={dropdownConst.provinces}
                            />

                            <p className={"p-tag"}> District </p>
                            <Dropdown
                                placeholder='Select district' className={"form-control teach-input"} fluid search selection
                                clearable selectOnBlur={false} value={district} onChange={this.dropdownOnChange('district')}
                                options={dropdownConst.districs}
                            />

                            <p className={"p-tag"}>Password</p>
                            <input className={"form-control teach-input"} name={"password"} type={"password"} value={password}
                                   placeholder={"Enter password"} onChange={this.textOnChange}/>

                            <p className={"p-tag"}>Confirm Password</p>
                            <input className={"form-control teach-input"} name={"confPassword"} type={"password"}
                                   value={confPassword}
                                   placeholder={"Re-enter password"} onChange={this.textOnChange}/>

                            <div className={"align-center login-btn-wrapper"}>
                                {/*<Button className="btn-neutral normal-txt" color="default" onClick={this.getOtpHandler}>*/}
                                    {/*Get mobile verification code*/}
                                {/*</Button>*/}
                                <Button className="com-btn reg-btn normal-txt" color="default" onClick={this.getOtpHandler}>
                                    Register
                                </Button>
                            </div>
                            <div className={"middle-wrapper"}>
                                <label className={"small-text"} onClick={() => this.setModalHandler("LOGIN")}>Already have an
                                    account? Sign in now</label>
                            </div>
                        </Modal.Content>:
                        <Modal.Content>
                            <p className={"success-modal-text"}>{`We've sent a 5-digit verification code to your mobile via SMS. Please provide it below`}</p>
                            <p className={"p-tag"}>{`Verification code`}</p>
                            <input className={"form-control teach-input"} name={"otp"} value={otp}
                                   placeholder={"Enter verification code"} onChange={this.textOnChange}/>

                            <div className={"align-center login-btn-wrapper"}>
                                <Button className="btn-neutral normal-txt" color="default" onClick={this.getOtpHandler}>
                                    Verify
                                </Button>
                                {expireTime === 0 && <p className={"expire-text"}>Didn't receive the code? <label className={'resend-text'} onClick={this.registerHandler}>Resend</label></p>}
                                {expireTime !== 0 && <p className={"expire-text"}>Pin expires in 00:<label>{expireTime < 10 ? `0${expireTime}`:expireTime}</label></p>}
                            </div>
                        </Modal.Content>
                }


                <Modal.Actions onClick={!isOtp ? () => this.setModalHandler(null):()=>this.setState({isOtp:false})}>
                    <div className={"home-wrapper"}>
                        <i className={`fa ${!isOtp ? `fa-home`:`fa-chevron-left`}`} aria-hidden="true"/>
                        <span>{`${!isOtp ? `Go to the Home`:`Go back`}`}</span>
                    </div>
                </Modal.Actions>
            </Modal>
        );
    }

}
const mapDispatchToProps = (dispatch) => ({
    spinnerHandler: data => dispatch(actionSpinnerCreator.spinnerHandler(data)),
});

export default connect(null, mapDispatchToProps)(withRouter(App));
