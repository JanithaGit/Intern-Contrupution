import ApiService from "./apiService";

/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/24/20
 * Time: 5:44 PM
 */
export async function getClassesFromHome(pagination) {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.endpoint = `student/public/class/home?page=${pagination.page}&size=${pagination.size}`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}
