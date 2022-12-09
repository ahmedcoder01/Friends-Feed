import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { isMobileOrTablet } from "../../utils/helpers";

interface DefaultRootState {
  sidebarOpen: boolean;
}

const initialState: DefaultRootState = {
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      console.log("toggleSidebar");
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

const uiActions = uiSlice.actions;

export default uiActions;
export const uiReducer = uiSlice.reducer;

export const getUI = (state: RootState) => state.ui;

//* THUNKS
