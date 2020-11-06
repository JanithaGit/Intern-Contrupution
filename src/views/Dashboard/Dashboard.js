/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import React, { Component } from 'react';
import axios from '../../services/axios';
import i from 'react-icofont';
import * as constants from "../../const/constants";
import './Dashboard.scss';

import { Card, Col, Row } from 'reactstrap';
import Cookies from 'js-cookie';
import CountUp from 'react-countup';
import {

  ACCESS_TOKEN,

} from "../../const/constants";
class App extends Component {

  state = {
    btnDropright: false,
    subsCount: '',
    totalUsers: '',
    likeCount: '',
    itemCount: '',
    itemName: '',
    dashboardData: [],
    appList: []
  }


  componentDidMount() {
    this.selectAppArticle()

  }



  selectAppArticle = () => {

    let selectedApp = localStorage.getItem('selectedApp')


    switch (selectedApp) {
      case "Articles": {
        const config = {
          headers: {
            'Authorization': `Bearer ${Cookies.get(ACCESS_TOKEN)}`,
            //'Content-Type': 'application/x-www-form-urlencoded'
          },
        };
        const data = {

          app_id: 1,
          article_id: 5,

        };

        axios.post(`${constants.SERVER_URL}article/dashboard`, data, config)
          .then(response => {
            if (response.data.success) {

              console.log(response);
              this.setState({
                totalUsers: response.data.body.appUsersNo,
                subsCount: response.data.body.totoalSubs,
                itemCount: response.data.body.totalArticleNo,
                itemName: 'Articles',
                likeCount: response.data.body.articleLikesNo,

              })
            }
          })
          .catch(error => {
          })
          .finally(fin => {

          })
      }
        ; break;

      case "News":
        this.setState({
          totalUsers: '3658',
          subsCount: '2455',
          itemCount: '345456',
          itemName: 'News',
          likeCount: '253654'
        }); break;

      default:
        break;
    }

  }








  render() {

    return (


      <div className={"dashboard-main"}>
        <Row>
          <Col lg="9"> <p className={"title-dash"}>Dashboard</p></Col>
          <Col lg="3">



          </Col>
        </Row>
        <Row className={"detail-row"}>
          <Col lg="3" >
            <Card className={"detail-col col-one"}>
              <Row>
                <Col lg="5" className={"detail-logo"}> <p><i class="icofont-live-messenger"></i></p></Col>
                <Col lg="7"  >
                  <p className={"col-label"}>Users</p>
                  <p className={"col-number"}><CountUp start={0} end={this.state.totalUsers} duration={5} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span ref={countUpRef} />
                      </div>
                    )}
                  </CountUp></p>
                  <p></p>
                </Col>
              </Row>
            </Card></Col>
          <Col lg="3" > <Card className={"detail-col col-two"}>
            <Row>
              <Col lg="5" className={"detail-logo"}><p><i class="icofont-bell-alt"></i></p></Col>
              <Col lg="7"  >
                <p className={"col-label"}>Subs</p>
                <p className={"col-number"}>
                  <CountUp start={0} end={this.state.subsCount} duration={5} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span ref={countUpRef} />
                      </div>
                    )}
                  </CountUp></p></Col>
            </Row>
          </Card></Col>
          <Col lg="3" > <Card className={"detail-col col-three"}>
            <Row>
              <Col lg="5" className={"detail-logo"}>
                <p><i class="icofont-ebook"></i></p></Col>
              <Col lg="7"  > <p className={"col-label"}>{this.state.itemName}</p><p className={"col-number"}>
                <CountUp start={0} end={this.state.itemCount} duration={5} delay={0}>
                  {({ countUpRef }) => (
                    <div>
                      <span ref={countUpRef} />
                    </div>
                  )}
                </CountUp></p></Col>
            </Row>
          </Card></Col>
          <Col lg="3" > <Card className={"detail-col col-four"}>
            <Row>
              <Col lg="5" className={"detail-logo"}><p><i class="icofont-like"></i></p></Col>
              <Col lg="7" > <p className={"col-label"}>Likes</p><p className={"col-number"}>
                <CountUp start={0} end={this.state.likeCount} duration={5} delay={0}>
                  {({ countUpRef }) => (
                    <div>
                      <span ref={countUpRef} />
                    </div>
                  )}
                </CountUp></p></Col>
            </Row>
          </Card></Col>
        </Row>

        <Row>
          <Col lg="3" >
            <Card className={"second-row-col"}>

            </Card>
          </Col>
          <Col >
            <Card lg="9" className={"second-row-col"}>
              {/* <Charts /> */}
            </Card>
          </Col>
        </Row>
      </div>



    );
  }
}

export default App;
