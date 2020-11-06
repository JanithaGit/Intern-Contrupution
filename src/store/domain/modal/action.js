/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/4/20
 * Time: 4:59 PM
 */

import * as actionTypes from "./actionType";

export const setModal = (data) => {
  return {
    type: actionTypes.SET_MODAL,
    value: data
  }
};
