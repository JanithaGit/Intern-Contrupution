/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/23/20
 * Time: 10:44 AM
 */
import ApiService from './apiService';

export async function loginUser(userCredentials) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = false;
    apiObject.isBasicAuth = true;
    apiObject.urlencoded = true;
    apiObject.endpoint = 'oauth/token';
    apiObject.body = userCredentials;
    apiObject.state = "login";
    return await ApiService.callApi(apiObject);
}
export async function userRegisterCheck(userObj) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = false;
    apiObject.endpoint = 'student/register/check';
    apiObject.body = userObj;
    return await ApiService.callApi(apiObject);
}
export async function userRegister(userObj) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = false;
    apiObject.endpoint = 'student/register';
    apiObject.body = userObj;
    return await ApiService.callApi(apiObject);
}
export async function renewToken(token) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = false;
    apiObject.isBasicAuth = true;
    apiObject.urlencoded = true;
    apiObject.endpoint = 'oauth/token';
    apiObject.body = token;
    apiObject.state = "renewToken";
    return await ApiService.callApi(apiObject);
}

// password reset
// Get OTP for an existing number by student
export async function getOtpForExistingNumber(mobile) {
    const apiObject = {};
    apiObject.method = 'PATCH';
    apiObject.authentication = false;
    apiObject.endpoint = `student/public/otp/existing/${mobile}`;
    apiObject.body = {};
    return await ApiService.callApi(apiObject);
}
// OTP Verify by Student
export async function verfifyOtp(data) {
    const apiObject = {};
    apiObject.method = 'PATCH';
    apiObject.authentication = false;
    apiObject.endpoint = `student/public/otp/verify`;
    apiObject.body = data;
    return await ApiService.callApi(apiObject);
}

// Student password reset
export async function passwordReset(data) {
    const apiObject = {};
    apiObject.method = 'PATCH';
    apiObject.authentication = false;
    apiObject.endpoint = `student/public/password/reset`;
    apiObject.body = data;
    return await ApiService.callApi(apiObject);
}

export async function logoutUser() {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.endpoint = 'logout';
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}
