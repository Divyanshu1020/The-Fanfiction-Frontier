import { CreateNewArticallResponse } from '@/appwrite/appwrite_types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Models } from 'appwrite'

interface PostsSlice {
    posts : (CreateNewArticallResponse & Models.Document)[] 
}
const initialState : PostsSlice = {
    posts: []
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        newPosts: (state, action: PayloadAction<(CreateNewArticallResponse & Models.Document)[] >) => {
            state.posts = action.payload
        },
        updatePosts: (state, action: PayloadAction<(CreateNewArticallResponse & Models.Document)[] >) => {
            state.posts = [...state.posts, ...action.payload]
        }
    }
})

export const { newPosts, updatePosts } = postsSlice.actions

export default postsSlice.reducer