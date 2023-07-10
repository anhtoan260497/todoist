import { configureStore } from '@reduxjs/toolkit'
import menuSlice from '../features/menu/menuSlice'
import modalSlice from '../features/modal/modalSlice'
import toastSlice from '../features/toast/toastSlice'
import loginSlice from '../features/login/loginSlice'

const reducers = {
    menuReducer : menuSlice,
    modalReducer : modalSlice,
    toastReducer : toastSlice,
    loginReducer : loginSlice
}

export const store = configureStore({
    reducer: reducers,
  })