const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_CHANGE = 'UPDATE-NEW-MESSAGE-CHANGE'

let initialState = {
    messagesData: [{
        id: 1,
        message: "Hi"
    }, {
        id: 2,
        message: "Stop your business"
    }, {
        id: 3,
        message: "I offer you gold"
    },
    ],
    usersData: [{
        id: 1,
        name: "Feodosij",
    }, {
        id: 2,
        name: "Bleda",
    }, {
        id: 3,
        name: "Ellac",
    }, {
        id: 4,
        name: "Flavius",
    },

    ],
    newMessageText: 'kal'
}

const dialogsReducer = (state = initialState, action) => {
    if (action.type === ADD_MESSAGE) {
        const newMessage = {
            id: 4,
            message: state.newMessageText,
        }
        state.messagesData.push(newMessage)
        state.newMessageText = ''
    } else if (action.type === UPDATE_NEW_MESSAGE_CHANGE) {
        state.newMessageText = (action.newText)
    }
    return state
}

export const addMessageActionCreator = () => ({type: ADD_MESSAGE})

export const updateNewMessageTextActionCreator = text => ({type: UPDATE_NEW_MESSAGE_CHANGE, newText: text})

export default dialogsReducer