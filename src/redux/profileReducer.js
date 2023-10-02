import {getUserProfileAPI} from '../API/API';

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_CHANGE = 'UPDATE-NEW-POST-CHANGE'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

let initialState = {
    postData: [{
        id: 1,
        text: 'Pillaging Balkans',
        likes: '15 likes '
    }, {
        id: 2,
        text: 'Besieging Constantinople',
        likes: '20 likes '
    }, {
        id: 3,
        text: 'Moving to Gaul',
        likes: '5 likes '
    },],
    newPostText: 'kal',
    profile: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: 5,
                text: state.newPostText,
                likes: "0 likes "
            }
            return {...state, postData: [...state.postData, newPost], newPostText: ''}

        case UPDATE_NEW_POST_CHANGE:
            return {...state, newPostText: action.newText}
        case SET_USER_PROFILE:
            return {...state, profile: action.prof}
        default:
            return state
    }
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const setUserProfile = (prof) => ({type: SET_USER_PROFILE, prof})
export const updateNewPostTextActionCreator = text => ({type: UPDATE_NEW_POST_CHANGE, newText: text})

export const getUserProfile = (userId) => {
    return (dispatch) => {
        getUserProfileAPI(userId).then(data => {
            dispatch(setUserProfile(data))
        })
    }
}

export default profileReducer