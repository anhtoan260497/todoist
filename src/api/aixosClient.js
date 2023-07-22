import axios from "axios";
import Cookies from "js-cookie";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: 'https://todoist-be-6li5.onrender.com/api/',
  // baseURL  : 'http://localhost:8080/api/',
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    'Authorization': `Bearer ${Cookies.get('token')}`
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    } 
    return response.data;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient