import axiosClient from "./aixosClient";

const projectAPI = {
    getAllProject : () => {
        const url = `project`
        return axiosClient.get(url)
    },
    updateProject : (project) => {
        const url = `project/update`
        return axiosClient.post(url,{project})
    }
};

export default projectAPI
