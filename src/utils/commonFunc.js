/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/20/20
 * Time: 2:58 PM
 */
/* eslint-disable*/
import toastr from 'toastr';
import swal from "sweetalert";
import * as constants from "../const/constants";
import Cookies from "js-cookie";
import * as classService from "../services/class";

export const b64EncodeUnicode = (str) => {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(
            match,
            p1
        ) {
            return String.fromCharCode("0x" + p1);
        })
    );
};
export const b64DecodeUnicode = (str) => {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(
        atob(str)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
};

export const notifyMessage = (msg, type, duration) => {
    let msgType = "warning";

    if (type === 2) {
        msgType = "warning"
    }else if (type === 0) {
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
        "timeOut": duration === undefined ? "2500":duration,
        "extendedTimeOut": "2500",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    toastr[msgType](msg === undefined || msg === null ? "Please enter correct details" : msg , type === 0 ? 'Error':type === 1 ? 'Success':'Warning')
};
export const formatCurrency = (val) => {
    val = val === undefined ? 0 : val;
    return val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const studentPurchaseWarning = (props,obj) => {
    if(props.userType === 1){
        swal({
            title: constants.ALERT_TEXT,
            icon: null,
            closeOnClickOutside: false,
            buttons: {
                cancel: 'No',
                dangerMode: {text: "Yes", value: "action", className: "okay-btn"}
            },
        }).then((value) => {
            switch (value) {
                case "action":
                    submitHandler(props,obj);
                    break;
                default:
                    break;
            }
        });
        return;
    }

    swal({
        title: constants.GUEST_STUDENT_FOR_PURCHASE,
        icon: null,
        closeOnClickOutside: false,
        buttons: {
            cancel: 'Not now',
            dangerMode: {text: "Okay", value: "action", className: "okay-btn"}
        },
    }).then((value) => {
        switch (value) {
            case "action":
                props.history.push(`${constants.BASE_ROUTE}${constants.AUTH_LOGIN_ROUTE}`);
                break;
            default:
                break;
        }
    });
};

export const submitHandler = async(props,obj) => {
    props.spinnerHandler({isSpin: true, type: 15});
    await classService.enrollClass(obj)
        .then(response => {
            props.spinnerHandler(false);
            notifyMessage(response.message, response.status);

            if (response.success) {
                props.history.push(`${constants.BASE_ROUTE}${constants.HOME_MY_CLASS_ROUTE}`)
            }
        })
};

export const joinClassHandler = async(props,obj) => {
    props.spinnerHandler({isSpin:true,type:"Check the meeting..."});
    await classService.joinZoomClass(obj.id)
        .then(response => {
            props.spinnerHandler(false);
            if (response.success) {
                let body = response.body;
                const obj = {
                    zoomMeetingId:body.zoomMeetingId,
                    zoomMeetingPassword:body.zoomMeetingPassword,
                    zoomSignatureJwt: body.zoomSignatureJwt
                };
                props.history.push({pathname:`${constants.BASE_ROUTE}${constants.HOME_JOIN_CLASS_ROUTE}`,state:`${JSON.stringify(obj)}`})
            } else {
                notifyMessage(response.message, response.status);
            }
        })
};
