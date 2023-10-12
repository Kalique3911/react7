import {getAuthUserAvaAPI, getUserDataAPI, loginAPI, logoutAPI} from '../API/API'
import defaultAva from './../images/defaultAva.jpg'
import {stopSubmit} from 'redux-form'

const SET_AUTH_USER_DATA = 'SET-AUTH-USER-DATA'
const SET_AUTH_USER_PHOTO = 'SET-AUTH-USER-PHOTO'
const INITIALIZE = 'INITIALIZE'

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    messages: [],
    fieldsErrors: [],
    resultCode: 0,
    smallPhoto: defaultAva,
    isInitialized: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                id: action.id,
                email: action.email,
                login: action.login,
                isAuth: action.isAuth,
            }
        case SET_AUTH_USER_PHOTO:
            return {
                ...state,
                smallPhoto: action.small
            }
        case INITIALIZE:
            return {
                ...state,
                isInitialized: true
            }
        default:
            return state
    }
}

export const setAuthUserData = (id, email, login, isAuth) => ({type: SET_AUTH_USER_DATA, id, email, login, isAuth})
export const setAuthUserPhoto = (small) => ({type: SET_AUTH_USER_PHOTO, small})
export const initializingSuccess = () => ({type: INITIALIZE})

export const getUserData = () => {
    return (dispatch) => {
        getUserDataAPI().then(data => {
            dispatch(initializingSuccess())
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setAuthUserData(id, email, login, true))
                getAuthUserAvaAPI(data.data.id).then(small => {
                    dispatch(setAuthUserPhoto(small))
                })
            }
        })
    }
}

export const loginUser = (formData) => {
    return (dispatch) => {
        loginAPI(formData.email, formData.password, formData.rememberMe).then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getUserData())
                } else if (response.data.resultCode === 1) {
                    dispatch(stopSubmit('login', {email: response.data.messages, password: ' '}))
                }
            }
        )
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        logoutAPI().then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false))
                }
            }
        )
    }
}

export default authReducer