/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import React from 'react';
import {withRouter} from 'react-router';
import * as Cookie from "js-cookie";
import * as constants from "../const/constants";

export default function requireAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      if (!Cookie.get(constants.ACCESS_TOKEN)) {
        this.props.history.push(`${constants.BASE_ROUTE}/login`);
      }
    }

    render() {
      return Cookie.get(constants.ACCESS_TOKEN)
        ? <Component {...this.props} />
        : null;
    }
  }

  return withRouter(AuthenticatedComponent)
}
