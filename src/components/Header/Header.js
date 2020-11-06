import React from "react";
// import {Link} from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
import './Header.scss';

import {
    Button,
    UncontrolledCollapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
} from "reactstrap";
import * as constants from '../../const/constants';
import { withRouter } from "react-router";
import * as actionCreator from "../../store/domain/auth/action";
// import * as commonFunc from "../../utils/commonFunc";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import swal from "sweetalert";
import * as actionClassCreator from "../../store/domain/classes/action";
import Logo from '../../assets/img/logo/logo-dark.png';
import LogoDark from '../../assets/img/logo/logo-dark.png';
class DemoNavbar extends React.Component {
    state = {
        collapseClasses: "",
        collapseOpen: false
    };
    onExiting = () => {
        this.setState({
            collapseClasses: "collapsing-out"
        });
    };
    onExited = () => {
        this.setState({
            collapseClasses: ""
        });
    };
    setModalHandler = (str) => {
        if (str === "LOGIN") {
            this.props.history.push(`${constants.BASE_ROUTE}${constants.AUTH_LOGIN_ROUTE}`);
            return;
        }
        if (str === "REG") {
            this.props.history.push(`${constants.BASE_ROUTE}${constants.AUTH_REG_ROUTE}`);
            return;
        }
        this.props.history.push(`${constants.BASE_ROUTE}${constants.HOME_INSTITUTE_ROUTE}`);
    };
    logoutHandler = () => {
        swal({
            title: constants.ALERT_TEXT,
            icon: null,
            closeOnClickOutside: false,
            buttons: {
                cancel: 'No',
                dangerMode: { text: "Yes", value: "action", className: "okay-btn" }
            },
        }).then((value) => {
            switch (value) {
                case "action":
                    Cookies.remove(constants.ACCESS_TOKEN);
                    Cookies.remove(constants.REFRESH_TOKEN);
                    this.props.history.push(`${constants.BASE_ROUTE}${constants.AUTH_LOGIN_ROUTE}`);
                    // commonFunc.notifyMessage("Logout successfully",1);
                    break;
                default:
                    break;
            }
        });

    };

    componentDidMount() {
        let headroom = new Headroom(document.getElementById("navbar-main"));
        // initialise
        headroom.init();
    }

    routeHandler = (route) => {
        if (route === constants.HOME_INSTITUTE_ROUTE) {
            this.props.selectPagination(null);
        }
        if (route === constants.HOME_MY_CLASS_ROUTE) {
            this.props.selectMyClassPagination(null);
        }
        if (route === constants.HOME_PROFILE_ROUTE) { }
        this.props.history.push(`${constants.BASE_ROUTE}${route}`);
    };

    render() {
        let { active, userType } = this.props;
        return (
            <>
                <header className="header-global ">
                    <Navbar
                        className="navbar-main navbar-transparent navbar-ligh headroom "
                        expand="lg"
                        id="navbar-main"
                    >
                        <Container className="about">
                            <NavbarBrand className="mr-lg-5">
                                <img
                                    className={"logo-img"}
                                    alt="..."
                                    src={Logo}
                                />
                                {/*<p className={"main-txt n-m"}> {"- Teach Me -"}</p>*/}
                            </NavbarBrand>
                            <button className="navbar-toggler" id="navbar_global" >

                                <span className="toggle-ctrl" > <i className="icofont-justify-all"/></span>


                            </button>
                            <UncontrolledCollapse
                                toggler="#navbar_global"
                                navbar
                                className={this.state.collapseClasses}
                                onExiting={this.onExiting}
                                onExited={this.onExited}

                            >
                                <div className="navbar-collapse-header mobile">
                                    <Row >
                                        <Col className="collapse-brand" xs="8">
                                            {/*<Link to={`${constants.BASE_ROUTE}`}>*/}
                                            {/*<img*/}
                                            {/*alt="..."*/}
                                            {/*src={require("assets/img/brand/argon-react.png")}*/}
                                            {/*/>*/}
                                            {/*</Link>*/}
                                            {/*<Link>*/}
                                            {/*<label className={"main-txt n-m"}> {"- Teach Me -"}</label>*/}
                                            {/*</Link>*/}
                                            <img
                                                className={"logo-img"}
                                                alt="..."
                                                src={LogoDark}
                                            />
                                        </Col>
                                        <Col className="collapse-close" xs="4">
                                            <button className="navbar-toggler" id="navbar_global">
                                                <span />
                                                <span />
                                            </button>
                                        </Col>
                                    </Row>
                                </div>
                                <Nav className="navbar-nav-hover align-items-lg-center  " navbar>
                                    {/*mobile*/}
                                    <NavItem className="d-lg-none ml-lg-4 mb-1 mb-4 mr-4 ">

                                          {
                                              userType === 1 &&
                                              <Button
                                                  onClick={()=>this.routeHandler(constants.HOME_INSTITUTE_ROUTE)}
                                                  className={`btn-neutral  ${active === 0 ? `nav-link-active` : ``}`}
                                                  color="default">
                                                  <span className="btn-inner--icon"/>
                                                  <span className="nav-link-inner--text ml-1">Home</span>
                                              </Button>
                                          }


                                            {
                                                userType === 1 &&
                                                <Button
                                                    onClick={() => this.routeHandler(constants.HOME_MY_CLASS_ROUTE)}
                                                    className={`btn-neutral ${active === 1 ? `nav-link-active` : ``}`}
                                                    color="default">
                                                    <span className="fi-list"/>
                                                    <span className="nav-link-inner--text ml-1">My Class</span>
                                                </Button>
                                            }


                                            {
                                                userType === 1 &&
                                                <Button
                                                    onClick={() => this.routeHandler(constants.HOME_PROFILE_ROUTE)}
                                                    className={`btn-neutral mt-1 ${active === 2 ? `nav-link-active` : ``}`}
                                                    color="default">
                                                    <span className="btn-inner--icon"/>
                                                    <span className="nav-link-inner--text ml-1">Profile</span>
                                                </Button>

                                            }

                                    </NavItem>
                                    {/*mobile - end*/}

                                  {
                                      userType === 1 &&
                                      <NavItem className={"d-none d-lg-block"}>
                                      <NavLink
                                          className={`${"nav-link-item nav-text"} ${active === 0 ? `nav-link-active` : ``}`}
                                          onClick={()=>this.routeHandler(constants.HOME_INSTITUTE_ROUTE)}>
                                          Home
                                      </NavLink>
                                  </NavItem>
                                  }
                                    {
                                        userType === 1 &&
                                        <NavItem className={"d-none d-lg-block"}>
                                            <NavLink
                                                className={`${"nav-link-item nav-text"} ${active === 1 ? `nav-link-active` : ``}`}
                                                onClick={() => this.routeHandler(constants.HOME_MY_CLASS_ROUTE)}>
                                                My class
                                            </NavLink>
                                        </NavItem>
                                    }
                                    {
                                        userType === 1 &&
                                        <NavItem className="d-none d-lg-block">
                                            <NavLink
                                                className={`${"nav-link-item nav-text"} ${active === 2 ? `nav-link-active` : ``}`}
                                                onClick={() => this.routeHandler(constants.HOME_PROFILE_ROUTE)}>
                                                Profile
                                            </NavLink>
                                        </NavItem>
                                    }

                                </Nav>


                                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                                    {/*mobile*/}
                                    {
                                        userType === 1 ?
                                            <NavItem className="d-lg-none ml-lg-4">
                                                <Button className=" com-btn reg-btn" color="default"
                                                    onClick={this.logoutHandler}>
                                                    <span className="-btn" />
                                                    <span className="nav-link-inner--text ml-1 ">Logout</span>
                                                </Button>
                                            </NavItem> :
                                            <NavItem className="d-lg-none ml-lg-4">
                                                 <Button className=" com-btn log-btn  " color="default"
                                                    onClick={() => this.setModalHandler("LOGIN")}>

                                                    <span className="nav-link-inner--text ml-1">Login</span>
                                                </Button>

                                                <Button className=" com-btn reg-btn" color="warning"
                                                    onClick={() => this.setModalHandler("REG")}>

                                                    <span className="nav-link-inner--text ml-1">Registration</span>
                                                </Button>

                                            </NavItem>
                                    }
                                    {/*mobile - end*/}

                                    {
                                        userType === 1 &&
                                        <NavItem className="d-none d-lg-block ml-lg-4">
                                            <Button className="com-btn reg-btn" color="default"
                                                onClick={this.logoutHandler}>
                                                <span className="btn-inner--icon" />
                                                <span className="nav-link-inner--text ml-1">Logout</span>
                                            </Button>
                                        </NavItem>
                                    }
                                    {
                                        userType === 0 &&
                                        <NavItem className="d-none d-lg-block ml-lg-4">
                                            <Button className="com-btn log-btn"
                                                onClick={() => this.setModalHandler("LOGIN")}>
                                                <span className="btn-inner--icon" />
                                                <span className="nav-link-inner--text ml-1"> Login </span>
                                            </Button>
                                        </NavItem>

                                    }
                                    {
                                        userType === 0 &&
                                        <NavItem className="d-none d-lg-block ml-lg-4">
                                            <Button className="com-btn reg-btn"
                                                onClick={() => this.setModalHandler("REG")}>
                                                <span
                                                    className="nav-link-inner--text ml-1 reg-text"> Student Registration </span>
                                                <span className="btn-inner--icon reg-flash" />
                                            </Button>
                                        </NavItem>
                                    }


                                </Nav>
                            </UncontrolledCollapse>
                        </Container>
                    </Navbar>
                </header>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    userType: state.auth.userType,
});
const mapDispatchToProps = (dispatch) => ({
    setUserType: data => dispatch(actionCreator.setUserType(data)),
    selectPagination: data => dispatch(actionClassCreator.selectPagination(data)),
    selectMyClassPagination: data => dispatch(actionClassCreator.selectMyClassPagination(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DemoNavbar));
