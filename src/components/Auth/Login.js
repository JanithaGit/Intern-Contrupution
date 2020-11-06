/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import React, { Component } from 'react';
import { withRouter } from "react-router";
import './Login.scss';
import * as commonFunction from "../../utils/commonFunction";
import * as actionSpinnerCreator from "../../store/spinner/actions";
import { connect } from "react-redux";
import Cookies from 'js-cookie';
import * as constants from '../../const/constants';
import logo from "../../assets/img/logo.png";
import axios from 'axios';
import i from 'react-icofont';

import {

  BASIC_AUTH,
  AUTH_URL,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  ADMIN_USERNAME
} from "../../const/constants";
import {
  Button,
  Container,
  Row,
  Col,
  Label,
} from 'reactstrap';


class Login extends Component {



   constructor(props) {
     super(props);

this.passwordRef =React.createRef();
this.iconRevealPassword =React.createRef();
     this.state = {
      showPWS: false,
      username: '',
      password: '',
      loading: false,
  
    };
   }


  textOnChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    //if (name === "username") if ( value.length !== 0) return;
    this.setState({ [name]: value });
  };


togglePassword =(e) =>{
  this.setState({
    showPWS : !this.state.showPWS
  })
}

  logIn = () => {
    let { username, password } = this.state;
    username.trim() === "" ? commonFunction.notifyMessage("Please enter username") :
      password === "" ? commonFunction.notifyMessage("Please enter password") :
        this.fetchLogin();
  };

  fetchLogin = () => {
    const config = {
      headers: {
        'Authorization': `Basic ${BASIC_AUTH}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    };

    const data = new FormData();
    data.append('grant_type', 'password');
    data.append('username', this.state.username);
    data.append('password', this.state.password);

    this.props.spinnerHandler({ isSpin: true, type: 5 });

    axios.post(AUTH_URL + 'oauth/token', data, config)
      .then(res => {
        if (res.data) {

          Cookies.set(ADMIN_USERNAME, this.state.username);
          Cookies.set(ACCESS_TOKEN, res.data.access_token);
          Cookies.set(REFRESH_TOKEN, res.data.refresh_token);
          localStorage.setItem('selectedApp', 'Articles');
          this.setState({ loading: false });

          this.props.history.push(`${constants.BASE_ROUTE}/admin/dashboard`);

        } else {
          commonFunction.notifyMessage('Invalid username or password!');
        }
      })
      .catch(err => {

        const status = err.response ? err.response.status : 0;
        switch (status) {
          case 401:
            commonFunction.notifyMessage('Invalid username or password!');
            break;
          default:
            break;
        }
      })
      .finally(fin => {
        this.props.spinnerHandler(false)
      })
  };

  render() {
    const { showPWS, password } = this.state;
    return (
      <div>

        <div className={"flex-container login-bg"}>
          <Container className={"logo-cont "}>
            <Row>
              <Col lg="12" className="form-body">
                <div>
                  <img src={logo} className={"logo"} alt={"logo"} />
                </div>
                <div>
                  <p className="form-title">Sign In to your account</p>
                </div>
                <div className={"login-label"}><Label className="form-label ">Username</Label></div>
                <div>
                  <input
                    className={"login-input form-input"}
                    name={"username"}
                    type={"text"}

                    placeholder={"Enter username"}
                    onChange={this.textOnChange}

                  // value={"Username"}
                  />
                </div>
                <div className={"login-label"}><Label className="form-label">Password</Label></div>
                <div>
                
                  <input
                    className={"login-input form-input"}
                    name={"password"}
                    type={showPWS ? "test" : "password"}
                    placeholder={"Password"}
                    onChange={this.textOnChange}
                 ref ={this.passwordRef}
                  //value={"password"}
                
                  />
                     <span onClick={this.togglePassword} ref ={this.iconRevealPassword}>
                  <span>
                    { showPWS ?
                  <i class={"icofont-eye-blocked show-icon"}/>:
                      <i class={"icofont-eye-alt show-icon"}/>
                     }
                     </span>
                </span>
                </div>
               
                <div>
                  <Button
                    onClick={(e) => this.logIn(e)}
                    className="com-btn submit-btn">
                    Login
                  </Button>
                </div>
                {/* {this.props.testReduxa} */}
              </Col>
            </Row>
          </Container>
        </div>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(actionSpinnerCreator.spinnerHandler(data)),

});

export default connect(null, mapDispatchToProps)(withRouter(Login));
