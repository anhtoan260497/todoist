import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActiveMenu : false
}

export const menuSlice = createSlice({
    name : 'menuSlice',
    initialState,
    reducers : {
        setActiveMenu : (state,action) => {
            state.isActiveMenu = action.payload
        }
    }
})

export const {setActiveMenu} = menuSlice.actions
export default menuSlice.reducer