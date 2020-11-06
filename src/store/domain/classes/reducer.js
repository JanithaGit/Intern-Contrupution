/**
 * Created by WebStorm.
 * User: at7/4/20
 * Time: 5:02 PM
 */
import * as actionTypes from './actionType';

const initialState = {
    selectClass: null,
    purchaseClasses: [
        // {
        //     name: "2020 A/L Theory",
        //     lesson: "Frameworks of Heavy Rods",
        //     subject: "Combined Maths",
        //     dayTimes: [],
        //     time: "4.00 PM to 6.00 PM",
        //     buttonStatus: "BOUGHT",
        //     isExpired: false,
        //     valid: "July",
        //     nextDayOfClass: "20 Jul 2020",
        //     imageUrl: "https://www.appliedmaths.lk/frontend_assets/images/course/course-5eb50c4cdeea2.jpeg"
        // },
        // {
        //     topic: "2020 A/L Theory",
        //     lesson: "Rectilinear Motion - Part 04",
        //     subject: "Combined Maths",
        //     day: "Monday",
        //     time: "10.30 PM to 12.30 PM",
        //     amount: 2500,
        //     isPurchased: true,
        //     isExpired: true,
        //     valid: "July",
        //     next: "27 Jul 2020",
        //     image: "https://www.appliedmaths.lk/frontend_assets/images/course/course-5ed50d91ee904.png",
        //     syllabus: ["Rectilinear Motion (Graphs of Motion)", "Vectors", "Coplanar Force Systems"]
        // },
    ],
    classesByLecture: [],
    listOfLectures: [],
    pagination: {size:3, pageCount:1, page:0},
    paginationMyClass: {size:5, pageCount:1, page:0}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_CLASS:
            return {
                ...state,
                selectClass: action.value,

            };
        case actionTypes.FETCH_LECTURES:
            return {
                ...state,
                listOfLectures: action.value,

            };
        case actionTypes.SELECT_PAGE_ON_CLASS:
            return {
                ...state,
                pagination: action.value ? action.value : initialState.pagination,

            };
        case actionTypes.SELECT_PAGE_ON_MY_CLASS:
            return {
                ...state,
                paginationMyClass: action.value ? action.value : initialState.paginationMyClass,

            };
        case actionTypes.FETCH_ALL_MY_CLASS:
            return {
                ...state,
                purchaseClasses: action.value,
            };

        default:
            return state;
    }
};

export default reducer;
