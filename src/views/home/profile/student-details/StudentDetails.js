/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/27/20
 * Time: 11:13 AM
 */
import React,{Component} from 'react';
import '../Profile.scss';
import * as validator from "../../../../utils/validator";
import * as constants from "../../../../const/constants";
import moment from "moment";
// import md5 from "md5";

import * as commonFunc from "../../../../utils/commonFunc";
import swal from "sweetalert";
import Flatpickr from "react-flatpickr";
import {Dropdown} from "semantic-ui-react";
import * as dropdownConst from "../../../../utils/dropdownConst";
import {Button} from "reactstrap";
import * as actionStudentCreator from "../../../../store/domain/student/action";
import * as actionSpinnerCreator from "../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import * as studentService from "../../../../services/student";

class App extends Component{
    state = {
        id:0,name: '',gender: '',school: '',address: '',email: '',mobile: '',grade: '',district: '',province: '',
        dob: ''
    };
    textOnChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        if (name === "name" || name === "school" || name === "address") value = value.trim() !== "" ? value.replace(/^./, value[0].toUpperCase()) : "";
        if (name === "mobile") if (!validator.onlyDigit.test(value) && value.length !== 0) return;
        if (name === "email") value = value.toLowerCase();
        this.setState({[name]: value});
    };
    dropdownOnChange = (name) => (e, {value}) => {
        this.setState({[name]: value});
    };
    updateUserDetails = async () => {
        const latestObj = {...this.state, dob: moment(this.state.dob).format("YYYY-MM-DD")};
        const obj = {
            ...this.state,
            dob: moment(this.state.dob).format("YYYY-MM-DD")
        };
        delete obj['mobile'];
        delete obj['status'];

        this.props.spinnerHandler({isSpin:true,type:5});
        await studentService.updateUserDetails(obj)
            .then(response => {
                commonFunc.notifyMessage(response.message,response.status);
                this.props.userDetailsHandler(latestObj);
                this.props.spinnerHandler(false);
            })
    };
    componentDidMount(){
        this.setUserDetails();
    }
    setUserDetails = () => {
        let {userObj} = this.props;
        if(userObj){
            this.setState({...userObj})
        }
    };

    getOtpHandler = () => {
        let {name, gender,dob, school, address, email, mobile, grade, district, province} = this.state;
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
                                                                    this.updateUserDetails();
                                                                    break;
                                                                default:
                                                                    break;
                                                            }
                                                        });

    };
    render() {
        let {name, gender, dob, school, address, email, mobile, grade, district, province} = this.state;
        return (
            <div>
                {
                        <div className={"profile-middle"}>
                            {/*<p className={"p-tag"}>Mobile number</p>*/}
                            {/*<input className={"form-control teach-input"} name={"mobile"} value={mobile}*/}
                                     {/*placeholder={"Enter your mobile number"} onChange={this.textOnChange} disabled={true}/>*/}
                            <p className="num-bg">{`Your Registered mobile number is ${mobile}`}</p>

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

                            <br/>
                            <div className={"align-center login-btn-wrapper"}>
                                <Button className="com-btn log-btn" color="default" onClick={this.getOtpHandler}>
                                    Update Details
                                </Button>
                            </div>
                        </div>
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    userObj: state.student.userObj
});

const mapDispatchToProps = (dispatch) => ({
    userDetailsHandler: data => dispatch(actionStudentCreator.userDetailsHandler(data)),
    spinnerHandler: data => dispatch(actionSpinnerCreator.spinnerHandler(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
