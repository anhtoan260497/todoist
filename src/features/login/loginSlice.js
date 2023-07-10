import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    token : Cookies.get('token')  || '',
    isLoggedIn : false,
    isLoading : false
}

const loginSlice = createSlice({
    name : 'loginSlice',
    initialState,
    reducers : {
       setIsLoading(state,action) {
        state.isLoading = action.payload
       }
    }
})

export const {setIsLoading} = loginSlice.actions
export default loginSlice.reducer