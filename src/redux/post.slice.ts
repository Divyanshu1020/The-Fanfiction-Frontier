import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "@/appwrite/database";

interface PostSlice {
    postData : null | Post
}
const initialState : PostSlice = {
    postData : null
}
export const postSlice = createSlice({
    name : "post",
    initialState,
    reducers : {
        updatePostData : (state, action : PayloadAction<{postData : Post}>) => {
            state.postData = action.payload.postData
        }
    }
})

export const  {updatePostData} = postSlice.actions
export default postSlice.reducer