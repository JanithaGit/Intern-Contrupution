import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {BASE_ROUTE, STORAGE_KEY_ACCESS_TOKEN} from "../../Constants/Constants";

export default function AuthenticatedRoute({ component: C, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN) !== null
          ? <C {...props} />
          : <Redirect
            to={BASE_ROUTE + `/login`}
          />}
    />
  );
}
