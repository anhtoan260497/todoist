import axiosClient from "./aixosClient"

const loginAPI = {
    login : ({email, password}) => {
        const url = `account/login`
        return axiosClient.post(url,{email,password})
    }
}

export default loginAPI