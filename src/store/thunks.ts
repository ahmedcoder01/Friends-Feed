import { RootState } from ".";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";

// export app thunk type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export {
  signup,
  login,
  logout,
  refreshToken,
  fetch as updateUserCred,
} from "./slices/authSlice";
