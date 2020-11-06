import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import './assets/scss/style.scss';
import './assets/scss/fonts.scss';
import './assets/scss/colors.scss';
import './assets/scss/componentsStyle.scss';
import './assets/scss/viewsStyles.scss';
import * as constants from "./const/constants";
import requireAuth from './services/routerGuard';
import Loader from './components/Loader/Spinner/Loader';

// Containers
const TheLayout = React.lazy(() => import('./containers/Publisher/TheLayout'));
const TheLayout_Super = React.lazy(() => import('./containers/SupperAdmin/TheLayout'));
// Pages
const Login = React.lazy(() => import('./components/Auth/Login'));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Loader />
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path={`${constants.BASE_ROUTE}/login`} name="Login Page" render={props => <Login {...props} />} />
            <Route path={`${constants.BASE_ROUTE}/home`} component={requireAuth(TheLayout)} />
            <Route path={`${constants.BASE_ROUTE}/admin`} component={requireAuth(TheLayout_Super)} />
            <Redirect from={constants.BASE_ROUTE} to={`${constants.BASE_ROUTE}/login`} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
