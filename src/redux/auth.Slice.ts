import { createSlice } from '@reduxjs/toolkit'

interface AuthSlice {
    userStatus: boolean,
    userData : object | null
}

const initialState : AuthSlice = {
    userStatus: true,
    userData : null
}

export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers:{
        login : (state, action) => {
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