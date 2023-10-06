import {getUserProfileAPI, getUserStatusAPI, updateUserStatusAPI} from '../API/API'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_USER_STATUS = 'SET-USER-STATUS'

let initialState = {
    postData: [{
        id: 1, text: 'Pillaging Balkans', likes: '15 likes '
    }, {
        id: 2, text: 'Besieging Constantinople', likes: '20 likes '
    }, {
        id: 3, text: 'Moving to Gaul', likes: '5 likes '
    },],
    newPostText: 'kal',
    profile: null,
    status: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: 5, text: action.body, likes: '0 likes '
            }
            return {...state, postData: [...state.postData, newPost]}
        case SET_USER_PROFILE:
            return {...state, profile: action.prof}
        case SET_USER_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }
}

export const addPost = (body) => ({type: ADD_POST, body})
export const setUserProfile = (prof) => ({type: SET_USER_PROFILE, prof})
export const setUserStatusSuccess = status => ({type: SET_USER_STATUS, status})

export const getUserProfile = (userId) => {
    return (dispatch) => {
        getUserProfileAPI(userId).then(data => {
            dispatch(setUserProfile(data))
        })
    }
}

export const setUserStatus = (userId) => {
    return (dispatch) => {
        getUserStatusAPI(userId).then(response => {
            dispatch(setUserStatusSuccess(response.data))
        })
    }
}

export const updateUserStatus = (status) => {
    return (dispatch) => {
        updateUserStatusAPI(status).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserStatusSuccess(status))
            }
        })
    }
}

export default profileReducer