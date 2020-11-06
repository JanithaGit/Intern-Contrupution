import {combineReducers} from "redux";

// redux
import auth from "../../store/domain/auth/reducer";
import classes from "../domain/classes/reducer";
import modal from "../domain/modal/reducer";
import spinner from "../domain/spinner/reducer";
import institute from "../domain/institute/reducer";
import student from "../domain/student/reducer";

/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/4/20
 * Time: 5:00 PM
 */

const rootReducer = combineReducers({
    // ---- reducers -----
    spinner: spinner,
    auth: auth,
    institute: institute,
    classes: classes,
    modal: modal,
    student: student
});

export default rootReducer
