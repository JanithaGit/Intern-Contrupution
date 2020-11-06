/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/22/20
 * Time: 12:36 PM
 */
import React from 'react';
import './Loader.scss';
import {connect} from "react-redux";

let DEFAULT_TEXT = `Wait a moment...`;
let VERIFY_TEXT = `Verifying...`;
let HOLD_TEXT = `Hold on almost done...`;
let FETCHING_TEXT = `Fetching ...`;

const getText = (str) => {
    switch (str) {
        case 0:
            return DEFAULT_TEXT;
        case 5:
            return VERIFY_TEXT;
        case 10:
            return HOLD_TEXT;
        case 15:
            return FETCHING_TEXT;
        default:
            return str;
    }
};

const App = (props) => {
    // console.log(props)
    return (
        props.isSpinner && <div className={"loader-teach-css"}>
            <div className={"loader-wrapper"}>
                <span>{getText(props.type)}</span>
                <div className={"loader-main"}>
                    <div className="loader"/>
                </div>
            </div>
        </div>
    )
};
const mapStateToProps = (state) => ({
    isSpinner: state.spinner.isSpinner,
    type: state.spinner.type,
});

export default connect(mapStateToProps, null)(App);
