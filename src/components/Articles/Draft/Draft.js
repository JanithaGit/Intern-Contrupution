/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import React, {Component} from 'react';
import {MDBDataTable} from 'mdbreact';
import './Draft.scss';
import {ButtonGroup} from '@material-ui/core';
import {Button} from 'reactstrap';
import axios from "../../../services/axios";
import * as constants from "../../../const/constants";
import moment from "moment";
import * as tableColumns from "../../../const/tableColumns";
import * as actionSpinnerCreator from "../../../store/spinner/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as commonFunction from "../../../utils/commonFunction";
import swal from "sweetalert";
import UpdateArticle from '../../../views/Articles/Draft/EditArticle/EditArticle';
import AddImages from '../../../views/Articles/Draft/AddImages/AddImages';

class Table extends Component {
  state = {
    articles: [],
    updateArticle: null,
    addImages: null,
  };


  refreshData = () => {
    this.setState({updateArticle: null});
    this.getAllArticles();
  };


  getAllArticles = () => {
    // let adminUsername = Cookies.get(ADMIN_USERNAME);
    this.props.spinnerHandler(true);
    axios.get(`${constants.SERVER_URL}article/view/admin/`)
      .then(response => {
        if (response.data.success) {
          let respBody = response.data.body;
          let result = [];

          if (respBody && respBody.length !== 0) {
            respBody.map((body, index) => {
              if (body.state === 0) {
                result.push({
                  ...body,
                  created: moment(body.created).format("YYYY-MM-DD hh:mm a"),
                  number: index+1,
                  action: <ButtonGroup className={"btn-group"} key={index}>
                    

                    <Button className="com-btn submit-btn " onClick={() => this.alertModal(body.id, 1)}>Publish</Button>
                    <Button className="com-btn close-btn " onClick={() => this.updateModal(body)}>Edit</Button>
                    <Button className="com-btn close-btn " onClick={() => this.addImageModal(body)}>Add Images</Button>

                  </ButtonGroup>,


                })
              }
            })
          }
          this.setState({articles: result})
        } else {
          this.setState({articles: []})
        }
      })
      .catch(error => {
      })
      .finally(fin => {
        this.props.spinnerHandler(false)
      })
  };

  alertModal = (id, status) => {
    swal({
      title: constants.ARE_YOU_SURE_TEXT, icon: null, closeOnClickOutside: false,
      buttons: {cancel: 'No', dangerMode: {text: "Yes", value: "action", className: "okay-btn"}},
    }).then((value) => {

      switch (value) {
        case "action":
          this.stateUpdateHandler(id, status);
          break;
        default:
          break;
      }
    });
  };

  updateModal = (body) => {
    this.setState({updateArticle: body,});
  };
  addImageModal = (body) => {
    this.setState({addImages: body});
    if(!body){
      this.getAllArticles();
    }
  };
  stateUpdateHandler = (id, status) => {
    this.props.spinnerHandler(true);
    axios.put(`${constants.SERVER_URL}article/admin/update/state/${id}/${status}`)
      .then(response => {
        if (response.data.success) {
          let articlesList = this.state.articles;
          // let emptyEmp = this.state.articles.find((item,index) => id === item.id);
          let index = articlesList.findIndex(item => id === item.id);
          articlesList.splice(index, 1);
          this.setState({articles: articlesList})
        }
        commonFunction.warningAlert(response.data.success ? "State update successfully" : response.data.body, response.data.success);
      })
      .catch(error => {
      })
      .finally(fin => {
        this.props.spinnerHandler(false)
      })
  };

  componentDidMount() {
    this.getAllArticles();
  }

  render() {
    let {articles, updateArticle, addImages} = this.state;
    return (
      <div>
        <div>
          {updateArticle &&
          <UpdateArticle refreshData={this.refreshData} body={updateArticle} modalHandler={this.updateModal}
                         image={false}/>}
          {addImages && <AddImages refreshData={this.refreshData} body={addImages} modalHandler={this.addImageModal}/>}
        </div>
        <div>
          <MDBDataTable
            responsive
            className={"table"}
            striped
            bordered
            small
            data={{
              columns: tableColumns.draftArticles,
              rows: articles
            }}
          >
          </MDBDataTable>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(actionSpinnerCreator.spinnerHandler(data)),
});
export default connect(null, mapDispatchToProps)(withRouter(Table));
