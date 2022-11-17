import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {}
});

const uiActions = uiSlice.actions;

export default uiActions;
export const uiReducer = uiSlice.reducer;

//* THUNKS


