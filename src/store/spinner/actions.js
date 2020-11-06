/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import * as actionTypes from "../../store/spinner/actionTypes";

export const spinnerHandler = (data) => {
  return {
    type: actionTypes.IS_SPINNER,
    value: data
  }
};