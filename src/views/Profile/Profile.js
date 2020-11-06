/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import React, { Component } from 'react';
import { withRouter } from "react-router";
import './Profile.scss';
import i from 'react-icofont';
import logo from '../../assets/img/app prop 2.PNG'
import { Tab, Tabs } from 'react-bootstrap'

import {
    Row,
    Col,
    Button,

    Input,

} from 'reactstrap';
import { Paper } from '@material-ui/core';
import swal from "sweetalert";
import * as constants from '../../const/constants';
import * as commonFunction from "../../utils/commonFunction";
import * as actionSpinnerCreator from "../../store/spinner/actions";
import { connect } from "react-redux";
import Cookies from 'js-cookie';
import {

    ACCESS_TOKEN,
    REFRESH_TOKEN,

} from "../../const/constants";
import axios from 'axios';
class App extends Component {
    state = {

        adminData: null,
        body: [],
        oldPassword: '',
        newPassword: '',
        confPassword: ''

    }

    textOnChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        //if (name === "username") if ( value.length !== 0) return;
        this.setState({ [name]: value });
    };

    changePassword = () => {
        let { oldPassword, newPassword, confPassword } = this.state;
        oldPassword.trim() === "" ? commonFunction.notifyMessage("Current password cannot be empty") :
            newPassword === "" ? commonFunction.notifyMessage("Please enter new password") :
                confPassword === "" ? commonFunction.notifyMessage("Please enter confiremation password") :
                    confPassword !== newPassword ? commonFunction.notifyMessage("New passwords are mistmatch") :
                        swal({
                            title: constants.ARE_YOU_SURE_TEXT, icon: null, closeOnClickOutside: false,
                            buttons: { cancel: 'No', dangerMode: { text: "Yes", value: "action", className: "okay-btn" } },
                        }).then((value) => {
                            switch (value) {
                                case "action":
                                    this.fetchChangePassword();
                                    break;
                                default:
                                    break;
                            }
                        });


    };
    fetchChangePassword = () => {

        this.props.spinnerHandler(true);
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get(ACCESS_TOKEN)}`,
                //'Content-Type': 'application/x-www-form-urlencoded'
            },
        };
        const data = {
            oldPassword: this.state.oldPassword,
            password: this.state.newPassword,

        };

        axios.put(constants.SERVER_URL + 'article/admin/password', data, config)

            .then(response => {
                if (response.data.success) {
                    this.props.spinnerHandler(false);
                    commonFunction.warningAlert(response.data.success ? "Password Changed. Please log again.." : response.data.message, response.data.success);
                    this.props.history.push(`${constants.BASE_ROUTE}/login`);
                    Cookies.remove(ACCESS_TOKEN);
                    Cookies.remove(REFRESH_TOKEN);
                }
                else {
                    this.props.spinnerHandler(false);
                    commonFunction.warningAlert("Old password is wrong. Please try again.....");

                }
            })
            .catch(err => {
                this.props.spinnerHandler(false);
                commonFunction.warningAlert("Something went wrong");

            })
            .finally(fin => {

            })
    };




    changePasswordChange = () => {

    };



    render() {

        return (
            <div className={"profile-main"}>
                <Row className={"profile-row-one"}>
                    <Col lg="3">
                        <div className={"image-wrapper"}><img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUIE7MZAcG_Dq3TVof1tHAYLUSSq1y-nGrDQ&usqp=CAU"} alt="profile picture" className={"profile-image"} /></div>
                    </Col>
                    <Col lg="5">
                        <p className={"profile-col-topic-one"}>Kalpana Ambross</p>
                        <p className={"profile-col-data-one"}>

                            in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                            </p>

                    </Col>
                    <Col lg="4">
                        <Col lg="12">
                            <div>
                                <p>

                                    <table >

                                        <tr>
                                            <td ><i class="icofont-phone"></i></td>
                                            <td className={"table-icon"}>+947 123 45 67</td>
                                        </tr>
                                        <tr>
                                            <td ><i class="icofont-email"></i></td>
                                            <td className={"table-icon"}>epplab@ceyentra.lk</td>
                                        </tr>

                                    </table>
                                </p>
                            </div>
                        </Col>
                    </Col>

                </Row>
                <Row className={"profile-row-one"}>
                    <Col lg="12">

                        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className={"tab-main"}>
                            <Tab eventKey="home" title="Home" >
                                <Col lg="12">
                                    <div>

                                    </div>
                                    <div>
                                        <p className={"profile-col-data"}>
                                            <div>
                                                <table >
                                                    <tr>
                                                        <td className={"table-label"}>User Name</td>
                                                        <td className={"table-data"}><Input value="admin" className="form-input" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td className={"table-label"}>Mobile</td>
                                                        <td className={"table-data"}><Input value="+947 123 45 67" className="form-input" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td className={"table-label"}>E_mail</td>
                                                        <td className={"table-data"}><Input value="applab@ceyentra.lk" className="form-input" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td className={"table-data"}><Button className="com-btn submit-btn">Update</Button></td>
                                                    </tr>

                                                </table>

                                            </div>

                                        </p>
                                    </div>
                                </Col>  </Tab>
                            <Tab eventKey="change" title="Change Password" >
                                <Col lg="12">
                                    <div>
                                        <p className={"profile-col-data"}>
                                            <div>
                                                <table >
                                                    <tr>
                                                        <td className={"table-label"}>Old Password</td>
                                                        <td className={"table-data"}>
                                                            <Input className={"change-pass-input form-input"}
                                                                name={"oldPassword"}
                                                                type={"password"}
                                                                placeholder={"Enter old password"}
                                                                onChange={this.textOnChange} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td className={"table-label"}>New Password</td>
                                                        <td className={"table-data"}>
                                                            <Input
                                                                className={"change-pass-input form-input"}
                                                                name={"newPassword"}
                                                                type={"password"}
                                                                placeholder={"Enter new password"}
                                                                onChange={this.textOnChange} className="form-input" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td className={"table-label"}> Comfirm Password</td>
                                                        <td className={"table-data"}>
                                                            <Input
                                                                name={"confPassword"}
                                                                type={"password"}
                                                                placeholder={"Confirm new password"}
                                                                onChange={this.textOnChange}
                                                                className="form-input" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td className={"table-data"}>                                                <Button className="com-btn close-btn " onClick={(e) => this.changePassword(e)} >Change</Button>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </p>
                                    </div>

                                </Col>  </Tab>
                            <Tab eventKey="bank" title="Bank Details">
                                <Col lg="12">
                                    <div>
                                        <p className={"profile-col-data"}>

                                            <table >
                                                <tr >
                                                    <td>Bank Name</td>
                                                    <td className={"table-data"}>Sampath Bank</td>
                                                </tr>
                                                <tr>
                                                    <td>Branch</td>
                                                    <td className={"table-data"}> Panadura</td>
                                                </tr>
                                                <tr>
                                                    <td>Acoount Number</td>
                                                    <td className={"table-data"}>5145202255</td>
                                                </tr>
                                                <tr>
                                                    <td>Mobile</td>
                                                    <td className={"table-data"}>+947 123 45 67</td>
                                                </tr>


                                            </table>
                                        </p>
                                    </div>
                                </Col>  </Tab>
                            <Tab eventKey="app" title="App Details">
                                <Col lg="12" >
                                    <p className={"profile-col-data"}> in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                        </p>
                                    <Col lg="12">
                                        <div>
                                            <p className={"profile-col-data"}>
                                                <div>
                                                    <img src={logo} alt="app logo" className={"app-img"} /> </div>


                                            </p>
                                        </div></Col>

                                    <Row>

                                        <Col lg="6">
                                            <div className={"profile-stats"}>
                                                <p className={"profile-stats-topic"}> Users</p>
                                                <p className={"profile-col-number"}>2425</p>
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className={"profile-stats"}>
                                                <p className={"profile-stats-topic"}> Subscribers</p>
                                                <p className={"profile-col-number"}>122510</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Tab>
                            <Tab eventKey="feedbak" title="Feedbacks">
                                <Col lg="12">
                                    <div>
                                        <div>
                                            <Col lg="12">
                                                <Paper className={"feedback-paper"}>
                                                    <Row>
                                                        <Col lg="2">
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQcsjMZRq5tDcW-zaTDcZL01NOCrDYLglPqfQ&usqp=CAU" alt="profile" className={"feedback-img"} />
                                                        </Col>
                                                        <Col lg="10">
                                                            <Row>
                                                                <Col lg="6"><p>Sahan Adikari</p></Col>
                                                                <Col lg="6"><p>2020-02-12</p></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg="12"><p>Journal of Peace Research is the premier journal in the field, ....</p></Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Paper>
                                                <Paper className={"feedback-paper"}>
                                                    <Row>
                                                        <Col lg="2">
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRgfO1Mq0Kcpp5TjqGOja-AnEFkpFLAav4R0g&usqp=CAU" alt="profile" className={"feedback-img"} />
                                                        </Col>
                                                        <Col lg="10">
                                                            <Row>
                                                                <Col lg="6"><p>Sahan Adikari</p></Col>
                                                                <Col lg="6"><p>2020-02-12</p></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg="12"><p>SAGE Publications is an academic and professional publisher. We publish books, journals and software under the SAGE, Corwin Press, Paul Chapman Publishing,  ....</p></Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Paper>
                                                <Paper className={"feedback-paper"}>
                                                    <Row>
                                                        <Col lg="2">
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRgfO1Mq0Kcpp5TjqGOja-AnEFkpFLAav4R0g&usqp=CAU" alt="profile" className={"feedback-img"} />
                                                        </Col>
                                                        <Col lg="10">
                                                            <Row>
                                                                <Col lg="6"><p>Swing Chan</p></Col>
                                                                <Col lg="6"><p>2020-02-14</p></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg="12"><p>Journal of Peace Research is the premier journal in the field, ....</p></Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Paper>
                                                <Paper className={"feedback-paper"}>
                                                    <Row>
                                                        <Col lg="2">
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQcsjMZRq5tDcW-zaTDcZL01NOCrDYLglPqfQ&usqp=CAU" alt="profile" className={"feedback-img"} />
                                                        </Col>
                                                        <Col lg="10">
                                                            <Row>
                                                                <Col lg="6"><p>Sahan Adikari</p></Col>
                                                                <Col lg="6"><p>2020-02-12</p></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg="12"><p>Journal of Peace Research is the premier journal in the field, ....</p></Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Paper>
                                                <Paper className={"feedback-paper"}>
                                                    <Row>
                                                        <Col lg="2">
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSZFOZVX0pISwyfK8dk_TT80-aipmAFgtCN4w&usqp=CAU" alt="profile" className={"feedback-img"} />
                                                        </Col>
                                                        <Col lg="10">
                                                            <Row>
                                                                <Col lg="6"><p>Sahan Adikari</p></Col>
                                                                <Col lg="6"><p>2020-02-12</p></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg="12"><p>Journal of Peace Research is the premier journal in the field, ....</p></Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Paper>

                                            </Col>
                                        </div>
                                    </div>
                                </Col> </Tab>
                        </Tabs>

                    </Col>
                </Row>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    spinnerHandler: data => dispatch(actionSpinnerCreator.spinnerHandler(data)),

});

export default connect(null, mapDispatchToProps)(withRouter(App));
