/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/4/20
 * Time: 4:59 PM
 */

import * as actionTypes from "./actionType";

export const selectClass = (data) => {
  return {
    type: actionTypes.SELECT_CLASS,
    value: data
  }
};
export const selectPagination = (data) => {
    return {
        type: actionTypes.SELECT_PAGE_ON_CLASS,
        value: data
    }
};
export const selectMyClassPagination = (data) => {
    return {
        type: actionTypes.SELECT_PAGE_ON_MY_CLASS,
        value: data
    }
};
export const fetchLectures = (data) => {
    return {
        type: actionTypes.FETCH_LECTURES,
        value: data
    }
};
export const fetchAllPurchasedClass = (data) => {
    return {
        type: actionTypes.FETCH_ALL_MY_CLASS,
        value: data
    }
};
