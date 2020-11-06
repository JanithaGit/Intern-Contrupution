/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/23/20
 * Time: 2:26 PM
 */
// export const BASE_ROUTE = "/edulab/";
export const BASE_ROUTE = "/v2/";
export const ACCESS_TOKEN = "2d2c094";
export const REFRESH_TOKEN = "6c66b";
export const BASIC_AUTH = "c3R1ZGVudDo=";

// alert text
export const ALERT_TEXT = "Are you sure you want to proceed?";
export const DISABLE_YET = "Currently disabled this feature ...";

export const EXPIRED_TEXT = "Your session has expired. Please sign in again ...";
export const GUEST_STUDENT_FOR_PURCHASE = "To be able to purchase this class, please sign in to the panel";

// route paths
export const AUTH_LOGIN_ROUTE = "auth/login";
export const AUTH_REG_ROUTE = "auth/register";
export const AUTH_FORGOT_ROUTE = "auth/forgot-password";
export const HOME_ROUTE = "home";

export const HOME_INSTITUTE_ROUTE = `${HOME_ROUTE}/institute`;
export const HOME_MY_CLASS_ROUTE = `${HOME_ROUTE}/my-class`;
export const HOME_VIEW_CLASS_ROUTE = `${HOME_ROUTE}/view-class`;
export const HOME_JOIN_CLASS_ROUTE = `${HOME_ROUTE}/join-class`;
export const HOME_PROFILE_ROUTE = `${HOME_ROUTE}/profile`;

// text
export const BOUGHT_TEXT = "BOUGHT";
export const BUY_TEXT = "BUY";
export const PENDING_TEXT = "PENDING";

export const PURCHASE_STATUS = (str) => {
    switch (str) {
        case "BUY":
            return { name: "BUY", className: "buy-class" };
        case "BOUGHT":
            return { name: "BOUGHT", className: "bought-class" };
        case "PENDING":
            return { name: "PENDING", className: "pending-class" };
        default:
            return str;
    }
};
