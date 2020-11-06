/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/23/20
 * Time: 12:27 PM
 */
import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from "react-router";
import * as constants from "../../const/constants";
import Home from "../../views/home/main/Main"; //jpk
import Index from "../../views/home/teacher/Teacher";

import MyClass from "../../views/home/my-class/MyClass";
import JoinClass from "../../views/home/join-class/JoinClass";
import ViewClass from "../../views/home/view-lecture/ViewLecture";
import Profile from "../../views/home/profile/Profile";
import Cookies from "js-cookie";
import * as actionCreator from "../../store/domain/auth/action";
import * as actionStudentCreator from "../../store/domain/student/action";
import * as studentService from "../../services/student";
import { connect } from "react-redux";
import SiteLoader from "../../components/Loader/SiteLoader";
import * as commonFunc from "../../utils/commonFunc";

class App extends Component {

    fetchUserDetails = async () => {
        await studentService.fetchUserDetails()
            .then(response => {
                if (response.success) {
                    this.props.userDetailsHandler(response.body);
                    this.props.setUserType(1);
                    return;
                } else {
                    this.props.history.push(`${constants.BASE_ROUTE}${constants.AUTH_LOGIN_ROUTE}`);
                }
                commonFunc.notifyMessage(response.message, response.status);
            })
    };

    
    render() {
        let access_token = Cookies.get(constants.ACCESS_TOKEN);
        let { userType, userObj } = this.props;
        this.props.setUserType(!access_token ? 0 : userObj ? 1 : -1);

        if (access_token && !userObj) {
            this.fetchUserDetails();
        }

        return (
            <div>
                {
                    userType !== -1 ?
                        <Switch>

                            <Route
                                path={`${constants.BASE_ROUTE}${constants.HOME_INSTITUTE_ROUTE}`}
                                render={props => <Index {...props} />} />
                            {
                                userType === 1 &&
                                <Route
                                    path={`${constants.BASE_ROUTE}${constants.HOME_INSTITUTE_ROUTE}`}
                                    render={props => <Home {...props} />} />
                            }

                            {
                                userType === 1 &&
                                <Route
                                    path={`${constants.BASE_ROUTE}${constants.HOME_MY_CLASS_ROUTE}`}
                                    render={props => <MyClass {...props} />}
                                />
                            }
                            {
                                userType === 1 &&
                                <Route
                                    path={`${constants.BASE_ROUTE}${constants.HOME_JOIN_CLASS_ROUTE}`}
                                    render={props => <JoinClass {...props} />} />
                            }
                            {
                                userType === 1 &&
                                <Route
                                    path={`${constants.BASE_ROUTE}${constants.HOME_PROFILE_ROUTE}`}
                                    render={props => <Profile {...props} />} />
                            }

                            <Route
                                path={`${constants.BASE_ROUTE}${constants.HOME_VIEW_CLASS_ROUTE}`}
                                render={props => <ViewClass {...props} />}
                            />

                            <Redirect to={`${userType === 1 ? `${constants.BASE_ROUTE}${constants.HOME_MY_CLASS_ROUTE}` : `${constants.BASE_ROUTE}${constants.HOME_INSTITUTE_ROUTE}`}`} />
                        </Switch>
                        : <SiteLoader />
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    userType: state.auth.userType,
    userObj: state.student.userObj
});
const mapDispatchToProps = (dispatch) => ({
    setUserType: data => dispatch(actionCreator.setUserType(data)),
    userDetailsHandler: data => dispatch(actionStudentCreator.userDetailsHandler(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
