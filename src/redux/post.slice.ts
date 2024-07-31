import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateNewArticallResponse } from "@/appwrite/appwrite_types";
import { Models } from "appwrite";

interface PostSlice {
    postData : null | (CreateNewArticallResponse & Models.Document)
}
const initialState : PostSlice = {
    postData : null
}
export const postSlice = createSlice({
    name : "post",
    initialState,
    reducers : {
        updatePostData : (state, action : PayloadAction<{postData : (CreateNewArticallResponse & Models.Document)}>) => {
            state.postData = action.payload.postData
        }
    }
})

export const  {updatePostData} = postSlice.actions
export default postSlice.reducer