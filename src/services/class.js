import ApiService from "./apiService";

/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/26/20
 * Time: 10:30 AM
 */


export async function getClassDetailsById(data) {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.endpoint = `student/public/class/${data}`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}
export async function enrollClass(body) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.endpoint = `student/class/enroll`;
    apiObject.body = body;
    return await ApiService.callApi(apiObject);
}
export async function getAllEnrolledClass(pagination) {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.endpoint = `student/class/enroll?page=${pagination.page}&size=${pagination.size}`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}
export async function joinZoomClass(data){
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.endpoint = `student/class/enroll/${data}/join`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}
