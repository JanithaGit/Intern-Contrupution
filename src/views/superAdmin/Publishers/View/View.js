import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import * as tableColumns from '../../../../const/tableColumns';
import * as constants from '../../../../const/constants';

import {
    Button, ButtonGroup
} from 'reactstrap';


const ViewPublisher = () => {
    alert('working')
}
class App extends Component {
    state = {

    }


    ViewPublisher = () => {
        this.props.history.push(`${constants.BASE_ROUTE}/admin/publisher/details`);
    }


    render() {

        let results = [
            {
                index: '01',
                username: 'Janitha',
                actions: <ButtonGroup>
                    <Button className={"com-btn close-btn"} onClick={() => this.ViewPublisher()}>View</Button>
                    <Button className={"com-btn close-btn"}>Delete</Button>

                </ButtonGroup>

            },
            {
                index: '02',
                username: 'Katukenda',
                actions: <ButtonGroup>
                    <Button className={"com-btn close-btn"}> View</Button>
                    <Button className={"com-btn close-btn"}>Delete</Button>

                </ButtonGroup>
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
                        columns: tableColumns.publisherData,
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
