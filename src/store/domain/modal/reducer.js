/**
 * Created by WebStorm.
 * User: at7/4/20
 * Time: 5:02 PM
 */
import * as actionTypes from './actionType';

const initialState = {
  currentModal: null
};

const reducer=(state=initialState,action)=>{
  switch(action.type){
    case actionTypes.SET_MODAL:
      return {
        ...state,
        currentModal: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
