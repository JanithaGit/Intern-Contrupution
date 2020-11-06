/**
 * Created by WebStorm.
 * User: at7/4/20
 * Time: 5:02 PM
 */
import * as actionTypes from './actionType';

const initialState = {
    isSpinner: false,
    type: 0
};

const reducer=(state=initialState,action)=>{
    switch(action.type){

        case actionTypes.IS_SPINNER:
            return {
                ...state,
                isSpinner: action.value.isSpin ? action.value.isSpin : action.value ,
                type: action.value.type ? action.value.type:0
            };

        default:
            return state;
    }
};

export default reducer;
