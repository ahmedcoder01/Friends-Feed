import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./slices/appSlice";
import { authReducer } from "./slices/authSlice";
import { uiReducer } from "./slices/uiSlice";

let store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    app: appReducer,
  },

  // disable middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
