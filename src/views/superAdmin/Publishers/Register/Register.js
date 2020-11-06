import React, { Component } from 'react';
import {
    Col,
    Row,
    Input,
    Label,
    Button
} from 'reactstrap';
class App extends Component {
    state = {}
    render() {
        return (
            <div>
                <div className={"form-body"}>
                    <p className="form-title">Create App Publisher</p>

                  <div>
                  <Label className={"form-label"}>Username</Label>
                    <Input
                        className={"form-input"}
                        name={"username"}
                        type={"text"}
                        placeholder={"username"}
                    />
                  </div>
                  <div>
                  <Label className={"form-label"}>First Name</Label>
                    <Input
                        className={"form-input"}
                        name={"f_name"}
                        type={"text"}
                        placeholder={"First Name"}
                    />
                  </div>
                  <div>
                  <Label className={"form-label"}>Last Name</Label>
                    <Input
                        className={"form-input"}
                        name={"l_name"}
                        type={"text"}
                        placeholder={"Last Name"}
                    />
                  </div>

                  <div>
                  <Label className={"form-label"}>Email</Label>
                    <Input
                        className={"form-input"}
                        name={"email"}
                        type={"email"}
                        placeholder={"Email"}
                    />
                  </div>

                  <div>
                  <Label className={"form-label"}>Mobile Number</Label>
                    <Input
                        className={"form-input"}
                        name={"number"}
                        type={"number"}
                        placeholder={"Mobile Number"}
                    />
                  </div>

                  <div>
                  <Label className={"form-label"}>Tempory Password</Label>
                    <Input
                        className={"form-input"}
                        name={"t_password"}
                        type={"password"}
                        placeholder={"Tempory Password"}
                    />
                  </div>
                 <div >
                     <Button className={"com-btn submit-btn"}>Register</Button>
                 </div>

                    

                </div>
            </div>
        );
    }
}

export default App;
/* Created By Janitha Prashad Katukenda
 jpk Created on Fri Nov 06 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */
