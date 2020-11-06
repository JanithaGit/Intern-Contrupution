import React, { Component, viewsr } from 'react';
import './View.scss';
import i from 'react-icofont';
import logo from '../../../../assets/img/app prop 2.PNG'
import {
    Row,
    Col,
    Button,
    Card,
    ButtonGroup
} from 'reactstrap';
import { Paper } from '@material-ui/core';
import Select from 'react-select';
import swal from "sweetalert";
import * as constants from '../../../../const/constants';
class App extends Component {
    state = {

        adminData: null,
        body: [],
        apps:[
            {
                value:'1', label:'Weather App',
              
            },
             {
                value:'2', label:'School Class App',
              
            },
            {
                value:'3', label:'Traning Shedule App',
              
            }
        ]
    }

    ViewPublisherContent = () => {
        this.props.history.push(`${constants.BASE_ROUTE}/admin/publisher/content`);
    }

    render() {
        let { adminData } = this.state;
        return (
            <div className={"views-main"}>


                <Row className={"views-row-one"}>
                    <Col lg="4">
                        <div className={"image-wrapper"}><img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUIE7MZAcG_Dq3TVof1tHAYLUSSq1y-nGrDQ&usqp=CAU"} alt="views picture" className={"views-image"} /></div>
                    </Col>
                    <Col lg="4">
                        <p className={"views-col-topic-one"}>Kalpana Ambross</p>
                        <p className={"views-col-topic-two"}>Creative Content Writer</p>
                        <Row className={"views-stat-row"}>

                            <Col lg="3">
                                <div className={"views-stats"}>

                                </div>
                            </Col>
                            <Col lg="3">
                                <div className={"views-stats"}>

                                </div>
                            </Col>


                        </Row>
                    </Col>
                    <Col lg="4">
                        <Col lg="12">
                            <div>
                                <p className={"views-col-data"}>

                                    <table >
                                        <tr>
                                            <td>User Name</td>
                                            <td className={"table-data"}>Admin</td>
                                        </tr>

                                        <tr>
                                            <td>Mobile</td>
                                            <td className={"table-data"}>+947 123 45 67</td>
                                        </tr>
                                        <tr>
                                            <td>E_mail</td>
                                            <td className={"table-data"}>epplab@ceyentra.lk</td>
                                        </tr>

                                    </table>
                                </p>
                            </div>
                        </Col>
                    </Col>
                    <Col lg="12">
                        <hr className={"hr-line-one"} />
                    </Col>
                </Row>
                <Row>
                    <Col lg="4">
                        <div>
                            <p className={"views-col-topic"}>About<i className={"views-col-topic-spe"}>Publisher</i></p>
                            <p className={"views-col-data"}>

                                in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

                            </p>
                        </div>
                    </Col>
                    <Col lg="4" className={"midle-col"}>
                        <p className={"views-col-topic"}>Enrolled<i className={"views-col-topic-spe"}>Apps</i></p>

                        <Row>
                            <ol>
                                <li>
                                    <p>Article App</p>
                                    <ButtonGroup>
                                        <Button className={"com-btn close-btn"} onClick={this.ViewPublisherContent}>
                                            Detais
                                        </Button>
                                        <Button className={"com-btn close-btn"}>
                                            Remove
                                        </Button>

                                    </ButtonGroup>
                                </li>
                                <li>
                                    <p>Job Announsing App</p>
                                    <ButtonGroup>
                                        <Button className={"com-btn close-btn"} >
                                            Detais
                                        </Button>
                                        <Button className={"com-btn close-btn"}>
                                            Remove
                                        </Button>

                                    </ButtonGroup>
                                </li>
                            </ol>

                        </Row>
                    </Col>
                    <Col lg="4">
                        <p className={"views-col-topic"}>Assign<i className={"views-col-topic-spe"}>App</i></p>
                        <Row>
                           <Col lg="12">
                           <Select
                           
                           className={"select-item"}
                                name="catagoryId"
                                onChange={this.changeHandler}
                                options={this.state.apps}
                               // onChange={e => this.setState({ selectedCategoryId: e.value })}
                            />
                            <Button className={"com-btn submit-btn"}>Assign</Button>
                           </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;
/* Created By Janitha Prashad Katukenda
 jpk Created on Fri Nov 06 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */
