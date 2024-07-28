import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth.Slice";
import PostReducer from './post.slice'
import PostsReducer from './posts.Slice'
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
    posts: PostsReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
