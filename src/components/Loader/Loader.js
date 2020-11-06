/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import React, {Component} from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './Spinner/Loader.scss';

class App extends Component {
  //other logic - timeout={30000}
  render() {
    return (
      <div className={"loader-main"}>
        <Loader type="Grid" color="#52373D" height={100} width={100}/>
      </div>
    );
  }
}

export default App;
