import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        isInit: false
    },
    reducers: {
        setAuth: (state, action) => {
                state.isAuth = action.payload
            },
        setInit: (state, action) => {
            state.isInit = action.payload
        },
    }
})

export default authSlice.reducer

export const {setAuth, setInit} = authSlice.actions