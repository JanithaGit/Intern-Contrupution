/**
 * Created by WebStorm.
 * User: at7/4/20
 * Time: 5:02 PM
 */
import * as actionTypes from './actionType';

const initialState = {
    user: null,
    loggedInStatus: null,
    userType: -1,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH:
            return {
                ...state,
                loggedInStatus: true,
                user: action.value,

            };
        case actionTypes.SET_USER_TYPE:
            return {
                ...state,
                userType: action.value,

            };
        default:
            return state;
    }
};

export default reducer;
