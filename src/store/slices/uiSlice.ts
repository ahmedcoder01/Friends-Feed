import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { isMobileOrTablet } from "../../utils/helpers";

interface DefaultRootState {
  sidebarOpen: boolean;
}

const initialState: DefaultRootState = {
  sidebarOpen: isMobileOrTablet() ? false : true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

const uiActions = uiSlice.actions;

export default uiActions;
export const uiReducer = uiSlice.reducer;

export const getUI = (state: RootState) => state.ui;

//* THUNKS
