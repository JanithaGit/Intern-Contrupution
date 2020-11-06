/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/27/20
 * Time: 2:10 PM
 */
import React, {Component} from 'react';
import './Auth.scss';
import {Modal} from "semantic-ui-react";
import SectionPolygon from "../../SectionPolygon/SectionPolygon";
import {Button} from "reactstrap";
import * as constants from "../../../const/constants";
import {withRouter} from "react-router";
import * as validator from "../../../utils/validator";
import * as commonFunc from "../../../utils/commonFunc";
import * as authService from "../../../services/auth";
import * as actionSpinnerCreator from "../../../store/domain/spinner/action";
import connect from "react-redux/es/connect/connect";
import md5 from "md5";
import Logo from "../../../assets/img/logo/logo.png";
import Cookies from "js-cookie";

class App extends Component {
    state = {
        current: 0,
        mobile: '',
        otp: '',
        password: '',
        rePassword: '',
        expireTime: 30
    };
    setModalHandler = (str) => {
        if (str === "LOGIN") {
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
    textOnChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        if (name === "mobile" || name === "otp") if (!validator.onlyDigit.test(value) && value.length !== 0) return;
        this.setState({[name]: value});
    };
    setCurrentState = (id) => {
        this.setState({current: id})
    };
    proceedHandler = () => {
        let {current, mobile, otp, rePassword, password} = this.state;
        !validator.mobileNumValidator(mobile, 1) ? commonFunc.notifyMessage("Please enter valid mobile number. (Ex: 07XXXXXXXX)") :
            current === 1 && otp.trim() === "" ? commonFunc.notifyMessage("OTP Code cannot be empty") :
                current === 2 && !validator.passwordRegex.test(password) ? commonFunc.notifyMessage("Password must contain at least 8 characters, including UPPER/LOWERCASE/SPECIAL_CHARACTER and NUMBERS") :
                    current === 2 && password !== rePassword ? commonFunc.notifyMessage("Passwords do not match") :
                        this.submitHandler(current);
    };
    resendOtp = () => {
        this.submitHandler(-1);
    };
    submitHandler = async (id) => {
        console.log("id",id);
        let {mobile, otp, password} = this.state;

        if (id === 0 || id === -1) {
            this.props.spinnerHandler({isSpin: true, type: "Sending verification code.."});
            await authService.getOtpForExistingNumber(mobile)
                .then(response => {
                    this.props.spinnerHandler(false);
                    commonFunc.notifyMessage(response.message, response.status);
                    if (response.success) {
                        this.setState({current: 1, expireTime: 30});
                    }
                });
        }
        if (id === 1) {
            const obj = {
                "mobile": mobile,
                "otp": otp
            };
            this.props.spinnerHandler({isSpin: true, type: 5});
            await authService.verfifyOtp(obj)
                .then(response => {
                    this.props.spinnerHandler(false);
                    commonFunc.notifyMessage(response.message, response.status);
                    if (response.success) {
                        this.setState({current: 2});
                    }
                });
        }
        if (id === 2) {
            const obj = {
                "mobile": mobile,
                "otp": otp,
                "password": md5(password)
            };
            this.props.spinnerHandler({isSpin: true, type: 0});
            await authService.passwordReset(obj)
                .then(response => {
                    this.props.spinnerHandler(false);
                    commonFunc.notifyMessage(response.message, response.status);
                    if (response.success) {
                      this.setModalHandler("LOGIN");
                    }
                });
        }
    };
    countDown = () => {
        let {current, expireTime} = this.state;
        if (current === 1 && expireTime > 0) {
            this.setState({expireTime: (expireTime - 1)})
        }
    };

    componentDidMount() {
        this.timer = setInterval(this.countDown, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {

        let {current, mobile, otp, rePassword, password, expireTime} = this.state;
        console.log("expireTime", expireTime)
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
                    <p className={"lecture-intro login-title"}>Forgot password</p>
                    <SectionPolygon/>
                </Modal.Header>

                <Modal.Content>
                    {/*<div>*/}
                    {/*<CommingSoon />*/}
                    {/*<br/>*/}
                    {/*</div>*/}

                    <p className={"p-tag"}>Mobile number</p>
                    <input className={"form-control teach-input"} name={"mobile"} type={"telephone"}
                           placeholder={"Enter your mobile number"} onChange={this.textOnChange} value={mobile}
                           disabled={current !== 0}/>

                    {
                        current === 1 && <div>
                            <p className={"success-modal-text"}>{`We've sent a 5-digit verification code to your mobile via SMS. Please provide it below`}</p>
                            <p className={"p-tag"}>{`Verification code`}</p>
                            <input className={"form-control teach-input"} name={"otp"}
                                   placeholder={"Enter verification code"} onChange={this.textOnChange} value={otp}/>
                        </div>
                    }
                    {
                        current === 2 && <div>
                            <p className={"p-tag"}>New Password</p>
                            <input className={"form-control teach-input"} name={"password"} type={"password"}
                                   value={password}
                                   placeholder={"Enter new password"} onChange={this.textOnChange}/>

                            <p className={"p-tag"}>Re-enter New Password</p>
                            <input className={"form-control teach-input"} name={"rePassword"} type={"password"}
                                   value={rePassword}
                                   placeholder={"Re-enter new password"} onChange={this.textOnChange}/>
                        </div>
                    }

                    <div className={"align-center login-btn-wrapper"}>
                        <Button className="btn-neutral normal-txt" color="default" onClick={this.proceedHandler}>
                            {`${current === 0 ? `Get mobile verification code` : current === 1 ? `Verify` : `Change password`}`}
                        </Button>
                        {current === 1 && expireTime === 0 &&
                        <p className={"expire-text"}>Didn't receive the code? <label className={'resend-text'}
                                                                                     onClick={this.resendOtp}>Resend</label>
                        </p>}
                        {current === 1 && expireTime !== 0 && <p className={"expire-text"}>Pin expires in
                            00:<label>{expireTime < 10 ? `0${expireTime}` : expireTime}</label></p>}
                    </div>

                    <div className={"middle-wrapper"}>
                        {current === 1 && <div>
                            <label className={"small-text"} onClick={() => this.setCurrentState(0)}>Change mobile
                                number</label>
                            <br/>
                        </div>
                        }

                        <label className={"small-text"} onClick={() => this.setModalHandler("LOGIN")}>Back to login
                            page</label>
                    </div>
                </Modal.Content>

                <Modal.Actions onClick={() => this.setModalHandler(null)}>
                    <div className={"home-wrapper"}>
                        <i className="fa fa-home" aria-hidden="true"/>
                        <span>Go to the Home</span>
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
