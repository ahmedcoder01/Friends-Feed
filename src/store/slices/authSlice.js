import { createSlice } from "@reduxjs/toolkit";
import { extractError } from "../../utils/error";
import { authInstance, usersInstance } from "../../axios/axiosInstances";

const initialState = {
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
    setUser(state, actions) {
      state.user = actions.payload;
      if (actions.payload) {
        state.hasValidToken = true;
      } else if (!actions.payload) {
        state.hasValidToken = false;
      }
    },
    setHasValidToken(state, actions) {
      state.hasValidToken = actions.payload;
    },
    logout(state) {
      state.user = null;
      state.hasValidToken = false;
    },
    setError(state, actions) {
      state.error = actions.payload;
    },
    setAuthLoading(state, actions) {
      state.authLoading = actions.payload;
    },
    setSendingRequest(state, actions) {
      state.sendingRequest = actions.payload;
    },
  },
});

const authActions = authSlice.actions;

export default authActions;
export const authReducer = authSlice.reducer;

//* THUNKS

export function refreshToken({ updateUser }) {
  console.log("refreshToken thunk");
  return async (dispatch) => {
    dispatch(authActions.setAuthLoading(true));

    try {
      const req = await authInstance.post("/refresh");

      if (req.status === 200) {
        dispatch(authActions.setHasValidToken(true));
        console.log("success refresh");
        if (updateUser) {
          console.log("get user");

          dispatch(updateUserCred());
        }
      }
    } catch (err) {
      dispatch(authActions.setHasValidToken(false));
    } finally {
      dispatch(authActions.setAuthLoading(false));
    }
  };
}

export function login(email, pass) {
  return async (dispatch) => {
    dispatch(authActions.setError(null));
    dispatch(authActions.setSendingRequest(true));

    try {
      //TODO: send login request

      const cred = { email, password: pass };

      const req = await authInstance.post("/login", cred);
      const data = req.data;

      // error handling
      if (req.status === 401) {
        throw new Error("Wrong Credientials");
      }

      //TODO: request the backend developer to add default profile pic
      dispatch(authActions.setUser({
        ...data,
        picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
      }));
      //
    } catch (err) {
      const firstError = extractError(err);
      dispatch(
        authActions.setError(firstError || "Cannot login at the moment")
      );
    } finally {
      dispatch(authActions.setSendingRequest(false));
    }
  };
}

export function signup({ name, email, password, bio }) {
  return async (dispatch) => {
    // TODO: send signup request
    dispatch(authActions.setError(null));
    dispatch(authActions.setSendingRequest(true));


    const cred = { name, email, password, bio };
    console.log(name)

    try {
      const req = await authInstance.post("/signup", cred);
      const data = req.data;
      console.log(data);

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

export function logout() {
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

export function updateUserCred() {
  return async (dispatch) => {
    try {
      let req = await usersInstance.get("/me");
      const userData = req.data;
      //TODO: request the backend developer to add default profile pic
      dispatch(authActions.setUser({
        ...userData,
        picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
      }));
    } catch (err) {
      console.error(err);
    }
  };
}

//* SELECTORS

export const getAuthError = (state) => state.auth.error;
export const getAuth = (state) => state.auth;
