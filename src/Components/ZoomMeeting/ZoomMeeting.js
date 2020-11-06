// /*global ZoomMtg*/
import React, {Component} from 'react';
import {ZoomMtg} from '@zoomus/websdk';
import $ from 'jquery';

import {BASE_ROUTE, ZOOM_API_KEY,  ZOOM_LANG, ZOOM_ROLE} from "../../Constants/Constants";

class App extends Component {

  componentWillMount() {
    this.checkRouteState();
  }

  checkRouteState = async () => {
    let state = this.props.location.state;
    if (state) {
      this.meetingConfig(JSON.parse(state));
    } else {
      this.props.history.push(`${BASE_ROUTE}/teachers`);
    }
  };

  meetingConfig = (data) => {
    this.changeLayout("block");

    const meetingConfig = {
      signature: data.zoomSignatureJwt,
      apiKey: ZOOM_API_KEY,
      meetingNumber: data.zoomMeetingId,
      userName: data.teacherName,
      passWord: data.zoomMeetingPassword,
      role: ZOOM_ROLE,
      lang: ZOOM_LANG,
      china: 0,
      leaveUrl: `${BASE_ROUTE}/teachers`,
    };

    ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.7.10/lib', "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();

    ZoomMtg.init({
      leaveUrl: meetingConfig.leaveUrl,
      webEndpoint: meetingConfig.webEndpoint,
      success: (success) => {
        console.log("Zoom init", success);
        ZoomMtg.join({
          meetingNumber: data.zoomMeetingId,
          userName: meetingConfig.userName,
          signature: meetingConfig.signature,
          apiKey: meetingConfig.apiKey,
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
  };

  componentWillUnmount() {
    this.changeLayout("none");
  }

  changeLayout = (state) => {
    let root = $("#zmmtg-root");
    root.css("display", state);
    if(state === "block"){
      $("#root").css("display", "none")
    }else{
      $("#root").css("display", "block")
    }
  };

  render() {
    return <div/>;
  }
}

export default App;
