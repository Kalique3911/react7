const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_CHANGE = 'UPDATE-NEW-POST-CHANGE'

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
        text: 'Moving to Gallia',
        likes: '5 likes '
    },],
    newPostText: 'kal',
}

const profileReducer = (state = initialState, action) => {
    if (action.type === ADD_POST) {
        const newPost = {
            id: 5,
            text: state.newPostText,
            likes: "0 likes "
        }
        state.postData.push(newPost)
        state.newPostText = ''
    } else if (action.type === UPDATE_NEW_POST_CHANGE) {
        state.newPostText = action.newText
    }
    return state
}

export const addPostActionCreator = () => ({type: ADD_POST})

export const updateNewPostTextActionCreator = text => ({type: UPDATE_NEW_POST_CHANGE, newText: text})

export default profileReducer

