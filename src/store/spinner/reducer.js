/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import * as actionTypes from '../../store/spinner/actionTypes';

const initialState = {
    isSpinner: false,
    
};

const reducer=(state=initialState,action)=>{
    switch(action.type){

        case actionTypes.IS_SPINNER:
            return {
                ...state,
                isSpinner: action.value.isSpin ? action.value.isSpin : action.value ,
               
            };

        default:
            return state;
    }
};

export default reducer;
