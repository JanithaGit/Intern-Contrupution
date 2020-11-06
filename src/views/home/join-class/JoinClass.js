/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/18/20
 * Time: 2:50 AM
 */

// /*global ZoomMtg*/

import React, {Component} from 'react';
import {ZoomMtg} from '@zoomus/websdk';
import {withRouter} from "react-router";
import $ from 'jquery';
import * as config from '../../../const/config';
import * as constants from '../../../const/constants';
import * as commonFunc from '../../../utils/commonFunc';
import * as actionSpinnerCreator from "../../../store/domain/spinner/action";
import {connect} from "react-redux";

// let EMAIL = "tbole31@gmail.com";
// let MN = 7398206051;
// let USERNAME = "test-dev";
// let PWD = "2fgJrd";

class App extends Component {
    checkRouteState = async () => {
        let state = this.props.location.state;
        if (state) {
            this.meetingConfig(JSON.parse(state));
        } else {
            this.props.history.push(`${constants.BASE_ROUTE}${constants.HOME_MY_CLASS_ROUTE}`);
        }
    };
    meetingConfig = (data) => {
        this.changeLayout("block");
        let {userObj} = this.props;

        ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.7.10/lib', "/av");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();

        let meetingConfig = {
            apiKey: config.ZOOM_API_KEY,
            apiSecret: config.ZOOM_API_SECRET,
            meetingNumber: data.zoomMeetingId,
            passWord: data.zoomMeetingPassword,
            signature: data.zoomSignatureJwt,
            userName: userObj.name,
            role: config.ZOOM_ROLE,
            userEmail: (function () {
                try {
                    return commonFunc.b64DecodeUnicode(userObj.email);
                } catch (e) {
                    return userObj.email;
                }
            })(),
            lang: config.ZOOM_LANG,
            china: 0,
            leaveUrl: `${constants.BASE_ROUTE}${constants.HOME_MY_CLASS_ROUTE}`,
        };

        ZoomMtg.init({
            leaveUrl: meetingConfig.leaveUrl,
            webEndpoint: meetingConfig.webEndpoint,
            success: (success) => {
                console.log("Zoom init", success);
                this.props.spinnerHandler(false);
                ZoomMtg.join({
                    meetingNumber: meetingConfig.meetingNumber,
                    userName: meetingConfig.userName,
                    signature: meetingConfig.signature,
                    apiKey: meetingConfig.apiKey,
                    userEmail: meetingConfig.userEmail,
                    passWord: meetingConfig.passWord,
                    success: (success) => {
                        console.log("Zoom join", success);
                        console.log("join meeting success");
                        console.log("get attendeelist");

                        console.log("join meeting success");
                        console.log("get attendeelist");
                        ZoomMtg.getAttendeeslist({});
                        ZoomMtg.getCurrentUser({
                            success: (res) => {
                                console.log("success getCurrentUser", res.result.currentUser);
                            },
                        });
                    },
                    error: (error) => {
                        console.log("zoom join error", error)
                    }
                })
            },
            error: (error) => {
                console.log("zoom init error", error)
            }
        });

        // ZoomMtg.generateSignature({
        //     meetingNumber: meetingConfig.meetingNumber,
        //     apiKey: meetingConfig.apiKey,
        //     apiSecret: meetingConfig.apiSecret,
        //     role: meetingConfig.role,
        //     success: (res) => {
        //         console.log("Zoom generateSignature", res.result);
        //         meetingConfig.signature = res.result;
        //
        //     //    ------
        //
        //     },
        // });
    };
    changeLayout = (state) => {
        let root = $("#zmmtg-root");
        root.css("display", state);
    };

    componentWillMount() {
        this.checkRouteState();
    }

    componentWillUnmount() {
        this.changeLayout("none");
    }

    render() {
        return <div/>;
    }
}

const mapStateToProps = (state) => ({
    currentModal: state.modal.currentModal,
    userObj: state.student.userObj
});
const mapDispatchToProps = (dispatch) => ({
    spinnerHandler: data => dispatch(actionSpinnerCreator.spinnerHandler(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
