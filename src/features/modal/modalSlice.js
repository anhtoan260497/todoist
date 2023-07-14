import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowModalAddProject: false,
  isShowModalAddTask: false,
  isShowModalTaskDetail : false,
  taskDetailId : ''
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
    toggleModalTaskDetail : (state,action) => {
      state.isShowModalTaskDetail = action.payload
    },
    setTaskDetailId : (state,action) => {
      state.taskDetailId = action.payload
    }
  },
});

export const {toggleModalAddProject,toggleModalAddTask,toggleModalTaskDetail,setTaskDetailId } = modalSlice.actions
export default modalSlice.reducer
