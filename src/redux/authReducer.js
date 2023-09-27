const SET_AUTH_USER_DATA = 'SET-AUTH-USER-DATA'
const SET_AUTH_USER_PHOTO = 'SET-AUTH-USER-PHOTO'

let initialState = {
    data: {
        id: null,
        login: null,
        email: null,
    },
    messages: [],
    fieldsErrors: [],
    resultCode: 0,
    isAuth: false,
    smallPhoto: null,
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

export default authReducer