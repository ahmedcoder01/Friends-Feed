import { createSlice } from "@reduxjs/toolkit";

interface DefaultRootState {}

const initialState: DefaultRootState = {};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {},
});

const uiActions = uiSlice.actions;

export default uiActions;
export const uiReducer = uiSlice.reducer;

//* THUNKS
