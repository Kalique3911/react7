import {getAuthUserAvaAPI, getUserDataAPI, loginAPI, logoutAPI} from '../API/API'
import defaultAva from './../images/defaultAva.jpg'

const SET_AUTH_USER_DATA = 'SET-AUTH-USER-DATA'
const SET_AUTH_USER_PHOTO = 'SET-AUTH-USER-PHOTO'

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    messages: [],
    fieldsErrors: [],
    resultCode: 0,
    smallPhoto: defaultAva,
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
        default:
            return state
    }
}

export const setAuthUserData = (id, email, login, isAuth) => ({type: SET_AUTH_USER_DATA, id, email, login, isAuth})
export const setAuthUserPhoto = (small) => ({type: SET_AUTH_USER_PHOTO, small: small})

export const getUserData = () => {
    return (dispatch) => {
        getUserDataAPI().then(data => {
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