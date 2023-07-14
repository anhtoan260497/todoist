import axiosClient from "./aixosClient"

const loginAPI = {
    login : ({email, password}) => {
        const url = `auth/login`
        return axiosClient.post(url,{email,password})
    },
    checkLoggedIn : token => {
        const url = `auth/logged`
        return axiosClient.post(url,{token})
    },
    createAccount : ({email,password}) => {
        const url = `auth/create`
        return axiosClient.post(url,{
            email,password
        })
    }
}

export default loginAPI