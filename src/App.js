import React, {Component} from 'react';
import {BrowserRouter, Redirect, Switch} from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import './App.scss';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {BASE_ROUTE} from "./Constants/Constants";
import UnauthenticatedRoute from "./Components/RouteGuards/UnauthenticatedRoute";
import AuthenticatedRoute from "./Components/RouteGuards/AuthenticatedRoute";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containersz
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

class App extends Component {

  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <UnauthenticatedRoute exact path={BASE_ROUTE + "/login"} name="Login Page" component={Login}/>
            <UnauthenticatedRoute exact path={BASE_ROUTE + "/register"} name="Register Page" component={Register}/>
            <UnauthenticatedRoute exact path={BASE_ROUTE + "/404"} name="Page 404" component={Page404}/>
            <UnauthenticatedRoute exact path={BASE_ROUTE + "/500"} name="Page 500" component={Page500}/>
            <AuthenticatedRoute path={BASE_ROUTE + "/"} name="Home" component={DefaultLayout}/>
            <Redirect to={BASE_ROUTE + "/"} />
          </Switch>
        </BrowserRouter>
        <ToastContainer/>
      </>
    )
      ;
  }
}

export default App;
