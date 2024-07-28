import { Posts } from '@/appwrite/database'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PostsSlice {
    posts : Posts[] 
}
const initialState : PostsSlice = {
    posts: []
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        newPosts: (state, action: PayloadAction<Posts[]>) => {
            state.posts = action.payload
        },
        updatePosts: (state, action: PayloadAction<Posts[]>) => {
            state.posts = [...state.posts, ...action.payload]
        }
    }
})

export const { newPosts, updatePosts } = postsSlice.actions

export default postsSlice.reducer