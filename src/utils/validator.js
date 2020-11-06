/*eslint-disable*/
import React from 'react'
import * as commonFunc from "./commonFunc";

export const onlyDigit = new RegExp("^\\d+$");
export const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
export const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,}$)");

export const basicContactNumberValidator = (identity) => {
  let mobileNumRegex = new RegExp("^(0)[0-9]{9}$|^(07)[0-9]{8}$");
  return mobileNumRegex.test(identity);
};

export const mobileNumValidator = (identity, condition) => {
  let mobileNumRegex = new RegExp("^(077)[0-9]{7}$|^(076)[0-9]{7}$|^(075)[0-9]{7}$|^(071)[0-9]{7}$|^(072)[0-9]{7}$|^(070)[0-9]{7}$|^(078)[0-9]{7}$");
  if (mobileNumRegex.test(identity)) {
    return true;
  } else {
    if(condition !== 1){
      commonFunc.notifyMessage("Please enter valid 'Mobile' number. (Ex: 07XXXXXXXX)");
    }
    return false;
  }
};
