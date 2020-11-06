/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import {combineReducers} from "redux";
import spinner from "../../store/spinner/reducer";
import changeState from '../../store';


const rootReducer = combineReducers({
    spinner: spinner,
    changeState: changeState,
    
});

export default rootReducer