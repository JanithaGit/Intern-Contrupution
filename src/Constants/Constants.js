// http://54.251.66.247
const URL_TESTING = `http://54.251.66.247/api/v1/`;
// const URL_TESTING = `http://teachme.ceyentra.lk`;
const URL_REMOTE = `/api/v1/`;


export const SERVER_URL = window.location.hostname.indexOf('localhost') !== -1 || window.location.hostname.indexOf('localhost:3') !== -1 ?  URL_TESTING  : URL_REMOTE;
export const BASE_ROUTE = "/institute";

export const STORAGE_KEY_ACCESS_TOKEN = "access_token";
export const STORAGE_KEY_REFRESH_TOKEN = "refresh_token";
export const STORAGE_KEY_USER = "user";

// zoom configuration
export const ZOOM_API_KEY = "G9L5LE5HR-25WeESzYlZfA";
export const ZOOM_API_SECRET = "LxoOXUEslZ0XtcnS2nzDYwSTg6e73aNJ7eNo";
export const ZOOM_ROLE = 1;
export const ZOOM_LANG = "en-US";
