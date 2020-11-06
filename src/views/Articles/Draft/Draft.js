/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import React, { Component } from 'react';
import DraftTable from '../../../components/Articles/Draft/Draft';
import './Draft.scss';

class App extends Component {

  render() {
    return (
      <div className="form-body">
        <DraftTable />
      </div>

    );
  }
}

export default App;
