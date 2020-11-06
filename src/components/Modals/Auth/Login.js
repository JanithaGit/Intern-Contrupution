/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/20/20
 * Time: 6:07 PM
 */
import React, { Component } from 'react';
import './Auth.scss';
import { Modal } from "semantic-ui-react";
import * as actionSpinnerCreator from "../../../store/domain/spinner/action";
import * as actionStudentCreator from "../../../store/domain/student/action";
import { connect } from "react-redux";
import SectionPolygon from "../../SectionPolygon/SectionPolygon";
import { Button } from 'reactstrap'
import * as constants from "../../../const/constants";
import { withRouter } from "react-router";
import * as validator from "../../../utils/validator";
import * as commonFunc from "../../../utils/commonFunc";
import * as authService from "../../../services/auth";
import md5 from 'md5';
import qs from 'qs';
import Cookies from "js-cookie";
import Logo from "../../../assets/img/logo/logo.png";

class App extends Component {
    state = {
        username: '',
        password: '',
    };
    textOnChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        if (name === "username") if (!validator.onlyDigit.test(value) && value.length !== 0) return;
        this.setState({ [name]: value });
    };
    loginHandler = () => {
        let { username, password } = this.state;
        username.trim() === "" ? commonFunc.notifyMessage("Mobile number cannot be empty") :
            password === "" ? commonFunc.notifyMessage("Password cannot be empty") :
                this.fetchHandler();
    };
    
    fetchHandler = async () => {
        let { username, password } = this.state;
        const obj = {
            username: username,
            password: md5(password),
            grant_type: 'password',
        };

        this.props.spinnerHandler({ isSpin: true, type: 5 });

        
        await authService.loginUser(qs.stringify(obj))
            .then(response => {
                this.props.spinnerHandler(false);

                if (response.access_token) {
                    Cookies.set(constants.ACCESS_TOKEN, response.access_token);
                    Cookies.set(constants.REFRESH_TOKEN, response.refresh_token);
                    this.props.userDetailsHandler(response.user.userDetails);
                    this.setModalHandler("USER");
                    return;
                }
                if (!response.success) {
                    commonFunc.notifyMessage(response.message, response.status)
                }
            })
    };

    setModalHandler = (str) => {
        if (str === "REG") {
            this.props.history.push(`${constants.BASE_ROUTE}${constants.AUTH_REG_ROUTE}`);
            return;
        }
        if (str === "FORGOT") {
            this.props.history.push(`${constants.BASE_ROUTE}${constants.AUTH_FORGOT_ROUTE}`);
            return;
        }
        if (str === "USER") {
            this.props.history.push(`${constants.BASE_ROUTE}${constants.HOME_INSTITUTE_ROUTE}`);
            return;
        }
        this.goToHomeHandler();
    };

    goToHomeHandler = async () => {
        await Cookies.remove(constants.ACCESS_TOKEN);
        await Cookies.remove(constants.REFRESH_TOKEN);
        this.props.history.push(`${constants.BASE_ROUTE}${constants.HOME_INSTITUTE_ROUTE}`);
    };

    render() {
        let { username, password } = this.state;
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
                    <p className={"lecture-intro login-title"}>Welcome to 'Edulab'</p>
                    <SectionPolygon />
                </Modal.Header>

                <Modal.Content>
                    <p className={"p-tag"}>Mobile number</p>
                    <input
                        className={"form-control teach-input"}
                        name={"username"}
                        type={"telephone"}
                        placeholder={"Enter your mobile number"}
                        onChange={this.textOnChange}
                        value={username} />

                    <p className={"p-tag"}>Password</p>
                    <input className={"form-control teach-input"} name={"password"} type={"password"}
                        placeholder={"Enter your password"} onChange={this.textOnChange} value={password} />

                    <div className={"align-center login-btn-wrapper"}>
                        <Button className="com-btn log-btn normal-txt" color="default" onClick={this.loginHandler}>
                            Login to the Panel
                        </Button>
                    </div>

                    <div className={"middle-wrapper"}>
                        {/*<label className={"small-text"} onClick={() => this.setModalHandler("FORGOT")}>Forgot your*/}
                        {/*password?</label>*/}
                        {/*<br/>*/}
                        <label className={"small-text"} onClick={() => this.setModalHandler("REG")}>Don't have an
                            account? Sign up now</label>
                    </div>
                </Modal.Content>

                <Modal.Actions onClick={() => this.setModalHandler(null)}>
                    <div className={"home-wrapper"}>
                        <i className="fa fa-home" aria-hidden="true" />
                        <span>Go to the Home</span>
                    </div>
                </Modal.Actions>
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    spinnerHandler: data => dispatch(actionSpinnerCreator.spinnerHandler(data)),
    userDetailsHandler: data => dispatch(actionStudentCreator.userDetailsHandler(data)),
});

export default connect(null, mapDispatchToProps)(withRouter(App));
