import {fetchUserProfile, fetchUserStatus, insertUserStatus} from '../API/API'
import {createAction} from '@reduxjs/toolkit'

let initialState = {
    postData: [{
        id: 1, text: 'Pillaging Balkans', likes: '15 likes '
    }, {
        id: 2, text: 'Besieging Constantinople', likes: '20 likes '
    }, {
        id: 3, text: 'Moving to Gaul', likes: '5 likes '
    },],
    profile: null,
    status: null,
    fake: 1
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-POST':
            let newPost = {
                id: 5, text: action.payload, likes: '0 likes '
            }
            if (action.payload) {
                return {...state, postData: [...state.postData, newPost]}
            } else {
                newPost = undefined
            }
            return state
        case 'SET-USER-PROFILE':
            return {...state, profile: action.payload}
        case 'SET-USER-STATUS':
            return {...state, status: action.payload}
        case 'FAKE':
            return {...state, fake: state.fake + 1}
        default:
            return state
    }
}

export const addPost = createAction('ADD-POST')
export const fakeAC = createAction('FAKE')
const setUserProfile = createAction('SET-USER-PROFILE')
const setUserStatusSuccess = createAction('SET-USER-STATUS')

export const getUserProfile = (userId) => {
    return (dispatch) => {
        fetchUserProfile(userId).then(data => {
            dispatch(setUserProfile(data))
        })
    }
}

export const setUserStatus = (userId) => {
    return (dispatch) => {
        fetchUserStatus(userId).then(response => {
            dispatch(setUserStatusSuccess(response.data))
        })
    }
}

export const updateUserStatus = (status) => {
    return (dispatch) => {
        insertUserStatus(status).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserStatusSuccess(status))
            }
        })
    }
}

export default profileReducer