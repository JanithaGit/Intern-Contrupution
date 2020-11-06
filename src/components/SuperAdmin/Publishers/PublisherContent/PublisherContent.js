import React, { Component } from 'react';
import { withRouter } from "react-router";
import './PublisherContent.scss';
import i from 'react-icofont';
import logo from '../../../../assets/img/app prop 2.PNG'
import { Tab, Tabs } from 'react-bootstrap'
import Table from '../../../../views/superAdmin/Publishers/View/View';

import {
    Row,
    Col,
    Button,

    Input,

} from 'reactstrap';
import { Paper } from '@material-ui/core';

class App extends Component {
    state = {

       
    }

    render() {

        return (
            <div className={"publisher-main"}>
                <Row className={"publisher-row-one"}>
                    <Col lg="3">
                    </Col>
                    <Col lg="5">
                        <p className={"publisher-col-topic-one"}>Kalpana Ambross</p>
                        <p className={"publisher-col-data-one"}>

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
                <Row className={"publisher-row-one"}>
                    <Col lg="12">

                        <Tabs defaultActiveKey="Content" id="uncontrolled-tab-example" className={"tab-main"}>
                            <Tab eventKey="Content" title="Content" >
                                <Col lg="12">
                              <h2>  Content Tabel</h2>
                                <Table/>
                                </Col>  </Tab>
                            <Tab eventKey="Users" title="Users"  >
                                <Col lg="12">
                               <h2> Public Users</h2>
                                <Table/>
                                </Col>  </Tab>
                            <Tab eventKey="Subs" title="Subscribers" >
                                <Col lg="12">
                                <h2>App subscribers</h2>
                                <Table/>
                                </Col>  </Tab>
                            
                        </Tabs>

                    </Col>
                </Row>

            </div>
        );
    }
}


export default (withRouter(App));


/* Created By Janitha Prashad Katukenda
 jpk Created on Fri Nov 06 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */
