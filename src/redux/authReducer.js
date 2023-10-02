import {getAuthUserAvaAPI, getUserDataAPI} from '../API/API'
import defaultAva from './../images/defaultAva.jpg'

const SET_AUTH_USER_DATA = 'SET-AUTH-USER-DATA'
const SET_AUTH_USER_PHOTO = 'SET-AUTH-USER-PHOTO'

let initialState = {
    data: {
        id: null,
        email: null,
        login: null,
    },
    messages: [],
    fieldsErrors: [],
    resultCode: 0,
    isAuth: false,
    smallPhoto: defaultAva,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                data: action.data,
                isAuth: true,
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

export const setAuthUserData = (id, email, login) => ({type: SET_AUTH_USER_DATA, data: {id, email, login}})
export const setAuthUserPhoto = (small) => ({type: SET_AUTH_USER_PHOTO, small: small})

export const getUserData = () => {
    return (dispatch) => {
        getUserDataAPI().then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setAuthUserData(id, email, login))
                getAuthUserAvaAPI(data.data.id).then(small => {
                    dispatch(setAuthUserPhoto(small))
                })
            }
        })
    }
}

export default authReducer