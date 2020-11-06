import axios from 'axios';
import {BASE_ROUTE, SERVER_URL, STORAGE_KEY_ACCESS_TOKEN, STORAGE_KEY_REFRESH_TOKEN} from "./Constants/Constants";

const instance = axios.create({
  baseURL: SERVER_URL
});
instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(
  async request => {
    const accessToken = localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN);
    if (accessToken != null) {
      request.headers.Authorization = 'Bearer ' + accessToken;
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
      data.append('grant_type', 'refresh_token');
      data.append('refresh_token', localStorage.getItem(STORAGE_KEY_REFRESH_TOKEN));

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic aW5zdGl0dXRlOg==',
        }
      };
      let isAccessTokenRefreshed = false;
      await axios.post(SERVER_URL + 'oauth/token', data, config)
        .then(async res => {
          const accessToken = res.data.access_token;
          localStorage.setItem(STORAGE_KEY_ACCESS_TOKEN, accessToken);
          instance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
          isAccessTokenRefreshed = true;
        })
        .catch(async err => {
          localStorage.clear();
          window.location = BASE_ROUTE + "/login";
        });
      console.log(isAccessTokenRefreshed);
      if (isAccessTokenRefreshed) {
        error.config.headers['Authorization'] = 'Bearer ' + localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN);
        return axios.request(error.config);
      }
    } else{
      return Promise.reject(error);
    }
  }
);

export default instance;
