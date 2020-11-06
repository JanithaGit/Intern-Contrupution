/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/27/20
 * Time: 11:16 AM
 */
import React,{Component} from 'react';
import '../Profile.scss';
import {Button} from "reactstrap";
import * as commonFunc from "../../../../utils/commonFunc";
import swal from "sweetalert";
import * as constants from "../../../../const/constants";
import md5 from "md5";
import * as validator from "../../../../utils/validator";
import * as studentService from "../../../../services/student";
import * as actionSpinnerCreator from "../../../../store/domain/spinner/action";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router";

class App extends Component{
    state = {
        prePassword:'',
        newPassowrd:'',
        rePassord:''
    };
    textOnChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    };
    validationHandler = () => {
        let {prePassword,newPassowrd,rePassord} = this.state;
        prePassword === "" ? commonFunc.notifyMessage("Current password cannot be empty") :
                !validator.passwordRegex.test(newPassowrd) ? commonFunc.notifyMessage("Password must contain at least 8 characters, including UPPER/LOWERCASE/SPECIAL_CHARACTER and NUMBERS") :
                newPassowrd !== rePassord ? commonFunc.notifyMessage("Passwords do not match") :
                    swal({
                        title: constants.ALERT_TEXT,
                        icon: null,
                        closeOnClickOutside: false,
                        buttons: {
                            cancel: 'No',
                            dangerMode: {text: "Yes", value: "action", className: "okay-btn"}
                        },
                    }).then((value) => {
                        switch (value) {
                            case "action":
                                this.changePasswordHandler();
                                break;
                            default:
                                break;
                        }
                    });
    };

    changePasswordHandler = async () => {
        let {prePassword,newPassowrd} = this.state;
        const obj = {
            oldPassword: md5(prePassword),
            newPassword: md5(newPassowrd),
        };
        this.props.spinnerHandler({isSpin: true, type: 15});
        await studentService.changePassword(obj)
            .then(response => {
                this.props.spinnerHandler(false);
                commonFunc.notifyMessage(response.message, response.status);

                if (response.success) {
                    this.props.stateHandler(0);
                }
            })
    };
    render() {
        let {prePassword,newPassowrd,rePassord} = this.state;
        return (
            <div className={"profile-middle"}>

                <p className={"p-tag"}>Current Password</p>
                <input className={"form-control teach-input"} name={"prePassword"} value={prePassword} type={"password"}
                       placeholder={"Enter previous password"} onChange={this.textOnChange}/>
                <br/>

                <p className={"p-tag"}>New Password</p>
                <input className={"form-control teach-input"} name={"newPassowrd"} value={newPassowrd} type={"password"}
                       placeholder={"Enter new password"} onChange={this.textOnChange}/>
                <p className={"p-tag"}>Re-enter New Password</p>
                <input className={"form-control teach-input"} name={"rePassord"} value={rePassord} type={"password"}
                       placeholder={"Enter re type new password"} onChange={this.textOnChange}/>

                <br/>
                <div className={"align-center login-btn-wrapper"}>
                    <Button className="com-btn log-btn" color="default" onClick={this.validationHandler}>
                        {`Change Password`}
                    </Button>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    spinnerHandler: data => dispatch(actionSpinnerCreator.spinnerHandler(data))
});
export default connect(null, mapDispatchToProps)(withRouter(App));
