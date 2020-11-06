/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import React, {Component} from 'react';
import {MDBDataTable} from 'mdbreact';
import './ArticleTable.scss';
import axios from '../../../services/axios';
import * as constants from "../../../const/constants";
import * as actionSpinnerCreator from "../../../store/spinner/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as tableColumns from '../../../const/tableColumns';
import moment from 'moment';
import {ButtonGroup,Switch} from "@material-ui/core";
import {Button} from 'reactstrap';
import ViewArticle from "../../../views/Articles/ArticleList/ViewArticle/ViewArticle";
import * as commonFunction from "../../../utils/commonFunction";
import swal from "sweetalert";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      selectedArticle: null,
      likesPerArticle:''
    };
  }
//delete article by id
  deleteHandler = (id) => {
    this.props.spinnerHandler(true);
    axios.delete(`${constants.SERVER_URL}article/delete/${id}`)
      .then(response => {
        if (response.data.success) {
          let articlesList = this.state.articles;
          let index = articlesList.findIndex(item => id === item.id);
          articlesList.splice(index, 1);
          this.setState({articles: articlesList})
        }
        commonFunction.warningAlert(response.data.success ? "The article has been deleted" : response.data.body,response.data.success);
      })
      .catch(error => {
      })
      .finally(fin => {
        this.props.spinnerHandler(false)
      })
  };

  alertModal = (object,status) => {
    swal({
      title: constants.ARE_YOU_SURE_TEXT, icon: null, closeOnClickOutside: false,
      buttons: {cancel: 'No', dangerMode: {text: "Yes", value: "action", className: "okay-btn"}},
    }).then((value) => {
      switch (value) {
        case "action":
          if(status === "HIDE"){
            this.stateUpdateHandler(object.id,object.state);
          }
          if(status === "DELETE"){
            this.deleteHandler(object);
          }

          break;
        default:
          break;
      }
    });
  };

//get likes per article
  getLikesPerArticle = (id) => {
      axios.post(`${constants.SERVER_URL}article/articlelikes/${id}`)
      .then(response => {
        if (response.data.success) {
          this.setState({
            likesPerArticle:response.data.body
          })
        }
       // console.log(this.state.likesPerArticle)
      })
      .catch(error => {
       
      })
  };

  //update state
  stateUpdateHandler = (id,state) => {
    let status = state === 2 ? 1:2;

    this.props.spinnerHandler(true);
    axios.put(`${constants.SERVER_URL}article/admin/update/state/${id}/${status}`)
      .then(response => {
        if (response.data.success) {
          let articlesList = this.state.articles;
          let index = articlesList.findIndex(item => id === item.id);
          articlesList[index].state = status;
          this.setState({articles: articlesList})
        }
        commonFunction.warningAlert(response.data.success ? "State update successfully" : response.data.body,response.data.success);
      })
      .catch(error => {
      })
      .finally(fin => {
        this.props.spinnerHandler(false)
      })
  };

  //get all article by username
  getAllArticles = () => {
    
    this.props.spinnerHandler(true);
    axios.get(`${constants.SERVER_URL}article/view/admin/desc`)
      .then(response => {
        if (response.data.success) {
          this.setState({articles: response.data.body})
          
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
  viewhandleClick = (body, id) => {
    this.setState({selectedArticle: body,})
    if(id !==undefined)
    {
      this.getLikesPerArticle(id)
    }
  };

  componentDidMount() {
    this.getAllArticles();
  }

  render()
  
  
  {
    let {articles, selectedArticle, likesPerArticle} = this.state;
    let result = [];
    articles.map((body, index) => {
      result.push({
        ...body,
        state: body.state === 0 ? "DRAFT" : body.state === 1 ? "PUBLISH" : body.state === 2 ? "HIDE" : "-",
        created: moment(body.created).format("YYYY-MM-DD hh:mm a"),
        updated: moment(body.updated).format("YYYY-MM-DD hh:mm a"),
        number: index +1,
        action: <ButtonGroup className={"btn-group"} key={index}>
          <Button className="com-btn submit-btn "
                  onClick={() => this.viewhandleClick(body, body.id)}
          >View</Button>
          <Button className="com-btn close-btn "
                  onClick={() => this.alertModal(body.id,"DELETE")}
          >Delete</Button>
        </ButtonGroup>,
        hide: body.state !== 0  ? <Switch onChange={()=>this.alertModal(body,"HIDE")} checked={body.state === 2}/> : null

      })
    });

    return (
      <div className={"article-main"}>
        <div>

          
          {selectedArticle  && <ViewArticle body={selectedArticle} like={this.state.likesPerArticle}    modalHandler={this.viewhandleClick}/>}
        </div>
        <div>
          <MDBDataTable
            responsive
            className={"table"}
            striped
            bordered
            small
            data={{
              columns: tableColumns.viewAllArticles,
              rows: result,

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

