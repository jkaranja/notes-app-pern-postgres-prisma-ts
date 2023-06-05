import { configureStore } from "@reduxjs/toolkit";
//import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";
import notesReducer from "../features/notes/notesSlice";
import userReducer from "../features/user/userSlice";
import { apiSlice } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    notes: notesReducer,

    // Add the generated reducer as a specific top-level slice
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    //disable redux devTool
  devTools: process.env.NODE_ENV !== "production",
});

//for typing redux toolkit hooks: useDispatch/useSelector
// Infer the `RootState` and `AppDispatch` types from the store itself
//Inferring these types from the store itself means that they correctly update as you add more state slices or modify middleware settings.

export type RootState = ReturnType<typeof store.getState>//type for state in useSelector
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState} + thunk middleware types//for useDispatch hook
export type AppDispatch = typeof store.dispatch 


////RTK: optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// enable listener behavior for the store//listens for changes in browser and connection to re fetch //must be enabled for refetchOnFocus & refetchOnReconnect to work
setupListeners(store.dispatch)


export default store