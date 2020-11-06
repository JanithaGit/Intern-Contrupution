/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import React, { Component } from 'react';
import ViewTable from '../../../components/Articles/AticleTable/ArticleTable';
import './ArticleList.scss';

class App extends Component {

  render() {
    return (
      <div className="form-body">
        <ViewTable />
      </div>
    );
  }
}

export default App;
