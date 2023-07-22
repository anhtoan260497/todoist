import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowModalAddProject: false,
  isShowModalAddTask: false,
  isShowModalTaskDetail: false,
  isShowDeleteProjectModal: false,
  taskDetailId: "",
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
    toggleModalTaskDetail: (state, action) => {
      state.isShowModalTaskDetail = action.payload;
    },
    setTaskDetailId: (state, action) => {
      state.taskDetailId = action.payload;
    },
    setIsShowDeleteProjectModal: (state, action) => {
      state.isShowDeleteProjectModal = action.payload;
    },
  },
});

export const {
  toggleModalAddProject,
  toggleModalAddTask,
  toggleModalTaskDetail,
  setTaskDetailId,
  setIsShowDeleteProjectModal,
} = modalSlice.actions;
export default modalSlice.reducer;
