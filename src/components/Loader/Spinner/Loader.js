/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import React from 'react';
import './Loader.scss';
import {connect} from "react-redux";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const App = (props) => {

  return (
    props.isSpinner && <div className={"loader-main"}>
      <Loader type="Grid" color="#52373D" height={100} width={100}/>
    </div>
  )
};
const mapStateToProps = (state) => ({
  isSpinner: state.spinner.isSpinner,

});


export default connect(mapStateToProps, null)(App);
