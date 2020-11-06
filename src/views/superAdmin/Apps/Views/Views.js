
import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import * as tableColumns from '../../../../const/tableColumns';
import * as constants from '../../../../const/constants';

import {
    Button, ButtonGroup
} from 'reactstrap';



class App extends Component {
    state = {

    }


    viewAppData = () => {
        this.props.history.push(`${constants.BASE_ROUTE}/admin/apps/details`);
    }


    render() {

        let results = [
            {
                index: '01',
            appname: 'Article',
                actions:
                    <Button className={"com-btn close-btn"} onClick={() =>this.viewAppData()}>View</Button>
                   
                
            },
            {
                index: '02',
                appname: 'News',
                actions:
                    <Button className={"com-btn close-btn"}> View</Button>
            },
                    
            {
                index: '03',
                appname: 'Job Market',
                actions:
                    <Button className={"com-btn close-btn"}> View</Button>
                  
            },
        ];



        return (
            <div>
                <MDBDataTable

                    responsive
                    className={"table"}
                    striped
                    bordered
                    small
                    data={{
                        columns: tableColumns.appData,
                        rows: results,
                    }}
                >
                </MDBDataTable>
            </div>
        );
    }
}

export default App;
/* Created By Janitha Prashad Katukenda
 jpk Created on Fri Nov 06 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */












