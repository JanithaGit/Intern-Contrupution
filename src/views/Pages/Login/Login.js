import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';//reactStrap
import {ValidatorUtil} from "../../../Util/ValidatorUtil";
import {ToastUtil} from "../../../Util/ToastUtil";
import {
  BASE_ROUTE,
  SERVER_URL,
  STORAGE_KEY_ACCESS_TOKEN,
  STORAGE_KEY_REFRESH_TOKEN,
  STORAGE_KEY_USER
} from "../../../Constants/Constants";
import {SwalUtil} from "../../../Util/SwalUtil";
import axios from 'axios';
import faviconIcon from "../../../assets/img/Edulabdark.png";

class Login extends Component {

  state = {
    username: '',
    password: ''
  };

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  onSearchKeyUp = (event) => {
    if (event.keyCode === 13) {
      this.logIn(event);
    }
  };

  validateForm(): boolean {

    if (ValidatorUtil.isEmpty(this.state.username)) {
      ToastUtil.showErrorToast('Please enter your username!');
      return false;
    }

    if (ValidatorUtil.isEmpty(this.state.password)) {
      ToastUtil.showErrorToast('Please enter your password!');
      return false;
    }
    return true;
  }

  logIn = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      SwalUtil.showLoadingSwal();

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic aW5zdGl0dXRlOg==',
        }
      };

      const data = new FormData();
      data.append('grant_type', 'password');
      data.append('username', this.state.username);
      data.append('password', this.state.password);

      axios.post(SERVER_URL + 'oauth/token', data, config)
        .then(res => {
          SwalUtil.closeSwal();
          if (res.data) {
            localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(res.data.user));
            localStorage.setItem(STORAGE_KEY_ACCESS_TOKEN, res.data.access_token);
            localStorage.setItem(STORAGE_KEY_REFRESH_TOKEN, res.data.refresh_token);
            this.props.history.push(BASE_ROUTE + '/teachers');
          } else {
            SwalUtil.showErrorSwal('Invalid username or password!');
          }
        })
        .catch(err => {
          SwalUtil.closeSwal();
          const status = err.response ? err.response.status : 0;
          switch (status) {
            case 401:
              SwalUtil.showErrorSwal('Invalid username or password!');
              break;
            default:
              ToastUtil.showNetworkErrorToast();
              break;
          }
        });
    }
  };

  // register = (e) => {
  //   e.preventDefault();
  //   this.props.history.push('/register');
  // };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-user"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="username"
                          placeholder="Username"
                          autoComplete="username"
                          onChange={this.changeHandler}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-lock"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={this.changeHandler}
                          onKeyUp={(e) => this.onSearchKeyUp(e)}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="12" md="12" className="text-center">
                          <Button


                            className="px-4 com-btn btn-primary"
                            style={{width: '100%', borderWidth: 0}}
                            onClick={(e) => this.logIn(e)}
                          >Login
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        {/*<Col xs="6">*/}
                        {/*  <Button color="link" className="px-0" style={{fontSize: '0.8em'}}>Forgot password?</Button>*/}
                        {/*</Col>*/}
                        {/*<Col xs="6" className="text-right">*/}
                        {/*  <Button*/}
                        {/*    color="link"*/}
                        {/*    className="px-0"*/}
                        {/*    style={{fontSize: '0.8em'}}*/}
                        {/*    onClick={(e) => this.register(e)}*/}
                        {/*  >SignUp*/}
                        {/*  </Button>*/}
                        {/*</Col>*/}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white com-bg py-5 d-md-down-none" style={{width: '44%'}}>
                  <CardBody className="text-center align-content-center">
                      <img src={faviconIcon} alt="" height='70px' style={{marginTop: 45}}/>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
