/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/19/20
 * Time: 5:16 PM
 */
import React from 'react';
import {Redirect, Route, Switch} from "react-router";
import * as constants from "./const/constants";
import {BrowserRouter} from "react-router-dom";
import * as actionCreator from "./store/domain/classes/action";
import connect from "react-redux/es/connect/connect";
import Loader from "./components/Loader/Loader";
import Login from "./components/Modals/Auth/Login";
import Register from "./components/Modals/Auth/Register";
import ForgotPassword from "./components/Modals/Auth/ForgotPassword";
import Layout from "./containers/Layout/Layout";

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Loader/>
                    <Switch>
                        <Route
                            path={`${constants.BASE_ROUTE}${constants.HOME_ROUTE}`} //byJPk
                            render={props => <Layout {...props} />}/>

                        <Route
                            path={`${constants.BASE_ROUTE}${constants.AUTH_LOGIN_ROUTE}`} exact
                            render={props => <Login {...props} />}/>
                        <Route
                            path={`${constants.BASE_ROUTE}${constants.AUTH_REG_ROUTE}`} exact
                            render={props => <Register {...props} />}/>
                        <Route
                            path={`${constants.BASE_ROUTE}${constants.AUTH_FORGOT_ROUTE}`} exact
                            render={props => <ForgotPassword {...props} />}/>

                        <Redirect to={`${constants.BASE_ROUTE}${constants.HOME_INSTITUTE_ROUTE}`}/>
                    </Switch>

                </BrowserRouter>

            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    selectClassHandler: data => dispatch(actionCreator.selectClass(data))
});

export default connect(null, mapDispatchToProps)(App);
