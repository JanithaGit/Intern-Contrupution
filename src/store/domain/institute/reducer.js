/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/24/20
 * Time: 3:23 PM
 */
import React from 'react';
import * as actionTypes from './actionType';

import instituteLogo from '../../../assets/img/institute/teacher-img.jpg';
import defaultImage from '../../../assets/img/institute/sakya-default.jpg';

let about = <div>I, Sampath Athukorala graduated from University of Moratuwa as an Engineering graduate in 2004. I joined MAS holdings as a management trainee for the department of research and development. It certainly drained my energy since it wasn't challenging or creative! I decided to change my profession. Actually I decided to build a career for myself. Teaching is something I'm fascinated about and challenges me every single day. Most of all, it's massively self-satisfying.
<br/><br/>
    While the entire hullabaloo I completed my Masters in Physics and started more classes in Panadura and Kaluthara. It was amazing to see how much students appreciated me helping them and raising their confidence to face exams and face life. I was a counselor and a teacher in both forms and guided students in every possible way. Leading English and Sinhala medium Physics teacher, being this person was a gift of all sorts that I will forever cherish because of the amount of students I'm able to teach. Started from 2 students around the dining table, more than 500 students in a batch is a long journey. Thousands of Engineers and Doctors will be produced in the future too.</div>;

const initialState = {
    institute: {
        name: "Sampath Athukorala",
        about: about,
        image: instituteLogo,
        defaultImage: defaultImage
    }
};

const reducer=(state=initialState,action)=>{
    switch(action.type){

        case actionTypes.INSTITUTE_HANDLER:
            return {
                ...state,
                institute: action.value
            };

        default:
            return state;
    }
};

export default reducer;
