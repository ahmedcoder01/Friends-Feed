import { AppThunk } from "./../thunks";
import { LoginReq, SignupReq } from "./../../types/src/api";
import { RootState } from "..";
import { User } from "./../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { extractError } from "../../utils/error";
import { authInstance, usersInstance } from "../../axios/axiosInstances";
import { Dispatch, ReducerState } from "react";

type DefaultRootState = {
  hasValidToken: boolean;
  user: User | null;
  error: string | null;
  authLoading: boolean;
  sendingRequest: boolean;
};

const initialState: DefaultRootState = {
  hasValidToken: false,
  user: null,
  error: null,
  authLoading: true,
  sendingRequest: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, actions: PayloadAction<User>) {
      state.user = actions.payload;
      if (actions.payload) {
        state.hasValidToken = true;
      } else if (!actions.payload) {
        state.hasValidToken = false;
      }
    },

    setHasValidToken(state, actions: PayloadAction<boolean>) {
      state.hasValidToken = actions.payload;
    },

    logout(state) {
      state.user = null;
      state.hasValidToken = false;
    },

    setError(state, actions: PayloadAction<string | null>) {
      state.error = actions.payload;
    },

    setAuthLoading(state, actions: PayloadAction<boolean>) {
      state.authLoading = actions.payload;
    },

    setSendingRequest(state, actions: PayloadAction<boolean>) {
      state.sendingRequest = actions.payload;
    },
  },
});

const authActions = authSlice.actions;

export default authActions;
export const authReducer = authSlice.reducer;

//* THUNKS

export function refreshToken({
  updateUser,
}: {
  updateUser: boolean;
}): AppThunk {
  return async (dispatch) => {
    dispatch(authActions.setAuthLoading(true));

    try {
      const req = await authInstance.post("/refresh");

      if (req.status === 200) {
        dispatch(authActions.setHasValidToken(true));
        console.log("success refresh");
        if (!updateUser) return;

        try {
          let req = await usersInstance.get("/me");
          const userData = req.data;
          //TODO: request the backend developer to add default profile pic
          dispatch(
            authActions.setUser({
              ...userData,
              picture:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
            })
          );
        } catch (err) {
          console.error(err);
        } finally {
          dispatch(authActions.setAuthLoading(false));
        }
      }
    } catch (err) {
      dispatch(authActions.setHasValidToken(false));
    }
  };
}
export function login({ email, password }: LoginReq): AppThunk {
  return async (dispatch) => {
    dispatch(authActions.setError(null));
    dispatch(authActions.setSendingRequest(true));

    try {
      //TODO: send login request

      const cred = { email, password: password };

      const req = await authInstance.post("/login", cred);
      const data = req.data;

      // error handling
      if (req.status === 401) {
        throw new Error("Wrong Credientials");
      }

      //TODO: request the backend developer to add default profile pic
      dispatch(
        authActions.setUser({
          ...data,
          picture:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        })
      );
      //
    } catch (err) {
      const firstError = extractError(err);
      dispatch(
        authActions.setError(firstError || "Cannot login at the moment")
      );
      dispatch(authActions.setAuthLoading(false));
    } finally {
      dispatch(authActions.setSendingRequest(false));
    }
  };
}

export function signup({ name, email, password, bio }: SignupReq): AppThunk {
  return async (dispatch) => {
    // TODO: send signup request
    dispatch(authActions.setError(null));
    dispatch(authActions.setSendingRequest(true));

    const cred = { name, email, password, bio };

    try {
      const req = await authInstance.post("/signup", cred);
      const data = req.data;

      if (req.status === 500) {
        throw new Error("Cannot create account at the moment");
      } else if (req.status === 409) {
        throw new Error("Email already exists");
      }

      dispatch(authActions.setUser(data));
    } catch (err) {
      const firstError = extractError(err);
      dispatch(authActions.setError(firstError || "Error while signing up"));
    } finally {
      dispatch(authActions.setSendingRequest(false));
    }
  };
}

export function logout(): AppThunk {
  return async (dispatch) => {
    try {
      const req = await authInstance.delete("/logout");

      if (req.status === 200) {
        dispatch(authActions.logout());
      }
    } catch (err) {
      console.log(err);
    }
  };
}

//* SELECTORS

export const getAuth = (state: RootState) => state.auth;
