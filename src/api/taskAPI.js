import axiosClient from "./aixosClient";

const taskAPI = {
  getAllTask : () => {
    const url = `/task/filter`
    return axiosClient.post(url)
  },
  removeTask : ({_id,projectName}) => {
    const url = `/task/remove`
    return axiosClient.post(url,{_id,projectName})
  }
};

export default taskAPI;
