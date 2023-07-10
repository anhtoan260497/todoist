import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastType: "",
  toastMessage: "",
};

const toastSlice = createSlice({
  name: "toastSlice",
  initialState,
  reducers: {
    setToastType(state, action) {
      state.toastType = action.payload;
    },
    setToastMessage(state, action) {
      state.toastMessage = action.payload;
    },
  },
});

// toastType {
//     error,
//     warning,
//     success
// }

export const { setToastType, setToastMessage } = toastSlice.actions;
export default toastSlice.reducer;
