import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        isInit: false,
        isLoggingOut: false,
        loginError: null
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setInit: (state, action) => {
            state.isInit = action.payload
        },
        setLogInError: (state, action) => {
            state.loginError = action.payload
        },
        setIsLoggingOut: (state, action) => {
            state.isLoggingOut = action.payload
        }
    }
})

export default authSlice.reducer

export const {setAuth, setInit, setLogInError, setIsLoggingOut} = authSlice.actions