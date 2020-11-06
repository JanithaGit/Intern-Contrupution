/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import axios from 'axios';
import Cookies from "js-cookie";
import {ACCESS_TOKEN, REFRESH_TOKEN, ADMIN_USERNAME, BASIC_AUTH, BASE_ROUTE} from "../const/constants";
import swal from "sweetalert";
import * as constants from "../const/constants";

const instance = axios.create({
});

instance.interceptors.request.use(
  request => {
    if (Cookies.get(ACCESS_TOKEN) !== undefined) {
      request.headers.Authorization = 'Bearer ' + Cookies.get(ACCESS_TOKEN);
    }
    return request;
  },
  error => error
);

instance.interceptors.response.use(
  response => response,
  async (error) => {

    const status = error.response ? error.response.status : 0;

    if (status === 401) {

      const data = new FormData();
      data.set('grant_type', 'refresh_token');
      data.set('refresh_token', Cookies.get(REFRESH_TOKEN));

      const config = {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + BASIC_AUTH
        }
      };

      await axios.post(constants.AUTH_URL + 'oauth/token', data, config)
        .then(res => {
          Cookies.save(ACCESS_TOKEN,res.data.access_token);
          Cookies.save(REFRESH_TOKEN,res.data.refresh_token);
          instance.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token;

          error.config.headers['Authorization'] = 'Bearer ' + res.data.access_token;
          return axios.request(error.config);
        })
        .catch(err => {
          swal({
            title: "Your token expired! Please re-enter login credentials \n Thank you",
            icon: "warning", closeOnClickOutside: false,
            buttons: {dangerMode: {text: "Okay", value: "action", className: "warning-btn"}},
          })
            .then((value) => {
              switch (value) {
                case "action":
                  Cookies.remove(ACCESS_TOKEN);
                  Cookies.remove(REFRESH_TOKEN);
                  Cookies.remove(ADMIN_USERNAME);
                  window.location = BASE_ROUTE;
                  break;
                default:
              }
            });
        });
    }else{
      swal({
        title: `Something went wrong! Error code: ${status}`,
        icon: "warning", closeOnClickOutside: false,
        buttons: {dangerMode: {text: "Okay", value: "action", className: "warning-btn"}},
      })
        .then((value) => {
          switch (value) {
            case "action":
              break;
            default:
          }
        });
    }
  }
);
export default instance;
