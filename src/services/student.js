import ApiService from "./apiService";

/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/29/20
 * Time: 8:21 AM
 */
export async function changePassword(body) {
    const apiObject = {};
    apiObject.method = 'PUT';
    apiObject.authentication = true;
    apiObject.endpoint = 'student/password';
    apiObject.body = body;
    return await ApiService.callApi(apiObject);
}
export async function fetchUserDetails() {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.endpoint = 'student';
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}
export async function updateUserDetails(body) {
    const apiObject = {};
    apiObject.method = 'PUT';
    apiObject.authentication = true;
    apiObject.endpoint = 'student';
    apiObject.body = body;
    return await ApiService.callApi(apiObject);
}
