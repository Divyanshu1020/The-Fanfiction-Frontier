import {
  Comment_Response,
  CreateNewArticallResponse,
} from "@/appwrite/appwrite_types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Models } from "appwrite";
// import comment from "@/appwrite/collections/comments";

interface PostSlice {
  postData: null | (CreateNewArticallResponse & Models.Document);
  userLikesThisPost: {
    likeId: string;
    isLike: boolean;
  } | null;
  postReplies: Comment_Response[];
}
const initialState: PostSlice = {
  postData: null,
  userLikesThisPost: null,
  postReplies: [],
  // idOfTotalCommentUserLiked: []
};
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePostData: (
      state,
      action: PayloadAction<{
        postData: CreateNewArticallResponse & Models.Document;
      }>
    ) => {
      state.postData = action.payload.postData;
    },

    makeCommentEmpty: (state) => {
      state.postReplies = [];
    },
    addComments: (
      state,
      action: PayloadAction<{ Comments: Comment_Response[] }>
    ) => {
      state.postReplies = [...action.payload.Comments, ...state.postReplies];
    },
    deleteComment: (state, action: PayloadAction<string>) => {
        state.postReplies = state.postReplies.filter((item) => item.$id !== action.payload);
      },
    deleteCommentOnComments: (
      state,
      action: PayloadAction<{ parentId: string; commentId: string }>
    ) => {
      state.postReplies.forEach((item) => {
        if (action.payload.parentId === item.$id) {
          item.replies =
            item.replies?.filter(
              (reply) => reply.$id !== action.payload.commentId
            ) || [];
        }
      });
    },
    addCommentsOnComments: (
      state,
      action: PayloadAction<{ Comments: Comment_Response[] }>
    ) => {
      state.postReplies.map((item) => {
        if (action.payload.Comments[0].parentId === item.$id) {
          item.replies = action.payload.Comments;
        }
      });
    },

    updateCommentsOnComments: (
      state,
      action: PayloadAction<{ Comments: Comment_Response[] }>
    ) => {
      state.postReplies.map((item) => {
        if (action.payload.Comments[0].parentId === item.$id) {
          item.replies = [...(item.replies || []), ...action.payload.Comments];
        }
      });
    },

    userLikeThisPost: (
      state,
      action: PayloadAction<{ likeId: string; isLike: boolean } | null>
    ) => {
      state.userLikesThisPost = action.payload;
    },
  },
});

export const {
  updatePostData,
  addComments,
  userLikeThisPost,
  addCommentsOnComments,
  updateCommentsOnComments,
  makeCommentEmpty,
  deleteComment,
  deleteCommentOnComments,
} = postSlice.actions;
export default postSlice.reducer;
