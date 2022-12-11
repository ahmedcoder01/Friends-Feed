import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface DefaultRootState {
  hasUnreadNotifications: boolean;
}

const initialState: DefaultRootState = {
  hasUnreadNotifications: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    haveRead: (state) => {
      state.hasUnreadNotifications = false;
    },
  },
});

const appActions = appSlice.actions;

export default appActions;
export const appReducer = appSlice.reducer;

export const getAppSlice = (state: RootState) => state.app;

//* THUNKS
