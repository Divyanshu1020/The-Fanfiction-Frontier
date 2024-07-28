import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Models } from 'appwrite';

type AppwriteUser = Models.User<Models.Preferences> ;
interface AuthSlice {
    userStatus: boolean,
    userData : AppwriteUser | null
}

const initialState : AuthSlice = {
    userStatus: false,
    userData : null 
}

export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers:{
        login : (state, action : PayloadAction<{ userData: AppwriteUser }>) => {
            state.userStatus = true
            state.userData = action.payload.userData
        },
        logout : (state) => {
            state.userStatus = false
            state.userData = null
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer