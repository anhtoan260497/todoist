import { configureStore } from '@reduxjs/toolkit'
import menuSlice from '../features/menu/menuSlice'

const reducers = {
    menuReducer : menuSlice
}

export const store = configureStore({
    reducer: reducers,
  })