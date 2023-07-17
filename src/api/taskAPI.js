import axiosClient from "./aixosClient";

const taskAPI = {
  getAllTask : () => {
    const url = `/task/filter`
    return axiosClient.post(url)
  },
  removeTask : ({_id,projectName}) => {
    const url = `/task/remove`
    return axiosClient.post(url,{_id,projectName})
  },
  addSubTask : ({_id,project,newSubTask}) => {
    const url = `/task/subtask/add`
    return axiosClient.post(url,{_id,project,newSubTask})
  },
  checkSubTask : ({_id,project,newSubTask}) => {
    const url = `/task/subtask/check`
    return axiosClient.post(url,{_id,project,newSubTask})
  },
};

export default taskAPI;
