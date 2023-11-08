import {createSlice} from '@reduxjs/toolkit'
import defaultAva from '../images/defaultAva.jpg'
import {fetchAuthUserAva, fetchUserData, loginAPI, logoutAPI} from '../API/API'
import {stopSubmit} from 'redux-form'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        id: null,
        email: null,
        login: null,
        isAuth: false,
        messages: [],
        fieldsErrors: [],
        resultCode: 0,
        smallPhoto: defaultAva,
        isInitialized: false
    },
    reducers: {
        setAuthUserData: {
            reducer: (state, action) => {
                state.id = action.payload.id
                state.email = action.payload.email
                state.login = action.payload.login
                state.isAuth = action.payload.isAuth
            },
            prepare: (id, email, login, isAuth) => {
                return {payload: {id, email, login, isAuth}}
            }
        },
        setAuthUserPhoto: (state, action) => {
            if (action.payload) {
                state.smallPhoto = action.payload
            }
        },
        initialize: (state) => {
            state.isInitialized = true
        },
    }
})

export const getUserData = () => {
    return (dispatch) => {
        fetchUserData().then(data => {
            dispatch(initialize())
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setAuthUserData(id, email, login, true))
                fetchAuthUserAva(data.data.id).then(small => {
                    dispatch(setAuthUserPhoto(small))
                })
            }
        })
    }
}

export const loginUser = (formData) => {
    return async (dispatch) => {
        let response = await loginAPI(formData.email, formData.password, formData.rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(getUserData())
        } else if (response.data.resultCode === 1) {
            dispatch(stopSubmit('login', {email: response.data.messages, password: ' '}))
        }
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        logoutAPI().then(data => {
                if (data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false))
                }
            }
        )
    }
}

export default authSlice.reducer

export const {setAuthUserData, setAuthUserPhoto, initialize} = authSlice.actions