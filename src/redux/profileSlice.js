import {fetchUserProfile, fetchUserStatus, insertUserStatus} from '../API/API'
import {createSlice} from '@reduxjs/toolkit'

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
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
    },
    reducers: {
        setPost: (state, action) => {
            // provieriajem, est' li dannyje v pejload
            if (action.payload) {
                state.postData.push({id: 5, text: action.payload, likes: '0 likes '})
            } else {
                return undefined
            }
        },
        setUserProfile: (state, action) => {
            state.profile = action.payload
        },
        setUserStatus: (state, action) => {
            state.status = action.payload
        },
        fakeIncrementor: state => {
            state.fake += 1
        }
    }
})

window.profileSlice = profileSlice

export const getUserProfile = userId =>
    dispatch => {
        fetchUserProfile(userId).then(data => {
            dispatch(setUserProfile(data))
        })
    }

export const getUserStatus = userId =>
    dispatch => {
        fetchUserStatus(userId).then(response => {
            dispatch(setUserStatus(response.data))
        })
    }

export const passUserStatus = status =>
    dispatch => {
        insertUserStatus(status).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(status))
            }
        })
    }

export default profileSlice.reducer

export const {setPost, setUserProfile, setUserStatus, fakeIncrementor} = profileSlice.actions