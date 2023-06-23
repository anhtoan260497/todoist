import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowModalAddProject: false,
  isShowModalAddTask: false,
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    toggleModalAddProject: (state, action) => {
      state.isShowModalAddProject = action.payload;
    },
    toggleModalAddTask: (state, action) => {
      state.isShowModalAddTask = action.payload;
    },
  },
});

export const {toggleModalAddProject,toggleModalAddTask} = modalSlice.actions
export default modalSlice.reducer
