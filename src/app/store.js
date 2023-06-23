import { configureStore } from '@reduxjs/toolkit'
import menuSlice from '../features/menu/menuSlice'
import modalSlice from '../features/modal/modalSlice'

const reducers = {
    menuReducer : menuSlice,
    modalReducer : modalSlice
}

export const store = configureStore({
    reducer: reducers,
  })