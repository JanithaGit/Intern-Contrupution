/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

const URL_TESTING = `http://139.59.88.228/applab/api/v1/`;
const AUTH_URL_TESTING = `http://139.59.88.228/applab/`;

const URL_REMOTE = `http://139.59.88.228/applab/api/v1/`;
const AUTH_URL_REMOTE = `http://139.59.88.228/applab/`;

export const SERVER_URL = window.location.hostname.indexOf('localhost') !== -1 || window.location.hostname.indexOf('localhost:3') !== -1 ?  URL_TESTING  : URL_REMOTE;
export const AUTH_URL = window.location.hostname.indexOf('localhost') !== -1 || window.location.hostname.indexOf('localhost:3') !== -1 ?  AUTH_URL_TESTING  : AUTH_URL_REMOTE;

export const ARE_YOU_SURE_TEXT = "Do you wish to continue?";

export const BASE_ROUTE = "/applab";
export const BASIC_AUTH = "YWRtaW46cGFzcw==";

// cookies
export const ACCESS_TOKEN = "rEeZWRtaW";
export const REFRESH_TOKEN = "uTeFzcwE";
export const ADMIN_USERNAME = "admin_username";


// notify
export const CURRENTLY_WORKING =  `We are currently working on this feature and will launch soon`;


      
 