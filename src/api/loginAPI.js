import axiosClient from "./aixosClient"

const loginAPI = {
    login : ({email, password}) => {
        const url = `auth/login`
        return axiosClient.post(url,{email,password})
    },
    checkLoggedIn : token => {
        const url = `account/logged`
        return axiosClient.post(url,{token})
    }
}

export default loginAPI