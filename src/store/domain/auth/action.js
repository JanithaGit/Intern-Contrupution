/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/4/20
 * Time: 4:59 PM
 */

import * as actionTypes from "./actionType";
// import Cookies from "js-cookie";

export const setAuth = (data) => {
  return {
    type: actionTypes.SET_AUTH,
    value: data
  }
};
export const setUserType = (data) => {
    return {
        type: actionTypes.SET_USER_TYPE,
        value: data
    }
};
