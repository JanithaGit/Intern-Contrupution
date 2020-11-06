/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 9/11/20
 * Time: 2:58 PM
 */
/* eslint-disable*/
import toastr from 'toastr';
import swal from "sweetalert";
//import * as constants from "../const/constants.js";
// import Cookies from "js-cookie";
import * as constants from "../const/constants";


export const notifyMessage = (msg, type, duration) => {
  let msgType = "warning";

  if (type === 2) {
    msgType = "warning"
  } else if (type === 0) {
    msgType = "error"
  } else if (type === 1) {
    msgType = "success"
  }
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "2500",
    "hideDuration": "2500",
    "timeOut": duration === undefined ? "2500" : duration,
    "extendedTimeOut": "2500",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
  toastr[msgType](msg === undefined || msg === null ? "Please enter correct details" : msg, type === 0 ? 'Error' : type === 1 ? 'Success' : 'Warning')
};
export const warningAlert = (msg, type) => {
  swal({
    title: msg ? msg : "Something went wrong",
    icon: type === 0 || type === true ? "success" : "error",
    closeOnClickOutside: false,
    buttons: {
      dangerMode: {
        text: "Okay",
        value: "action",
        className: "okay-btn"
      }
    }
  })
    .then((value) => {
      switch (value) {
        case "action":
          break;
        default:
      }
    })
};
export const currentlyDisabled = () => {
  notifyMessage(constants.CURRENTLY_WORKING);
};
