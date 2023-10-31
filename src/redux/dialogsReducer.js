const ADD_MESSAGE = 'ADD-MESSAGE'

let initialState = {
    messagesData: [{
        id: 1,
        message: 'Hi'
    }, {
        id: 2,
        message: 'Stop your business'
    }, {
        id: 3,
        message: 'I offer you gold'
    },
    ],
    dialogsData: [{
        id: 1,
        name: 'Feodosij',
    }, {
        id: 2,
        name: 'Bleda',
    }, {
        id: 3,
        name: 'Ellac',
    }, {
        id: 4,
        name: 'Flavius',
    },],
}

const dialogsReducer = (state = initialState, action) => {
    if (action.type === ADD_MESSAGE) {
        const newMessage = {
            id: 4,
            message: action.body,
        }
        return {...state, messagesData: [...state.messagesData, newMessage]}
    } else {
        return state
    }

}

export const addMessage = (body) => ({type: ADD_MESSAGE, body: body})

export default dialogsReducer