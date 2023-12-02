import {createSlice} from '@reduxjs/toolkit'

const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState: {
        messagesData: [{
            id: 1,
            message: 'Hi'
        }, {
            id: 2,
            message: 'How are you?'
        }, {
            id: 3,
            message: 'Wish you good luck'
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
    },
    reducers: {
        setMessage: (state, action) => {
            state.messagesData.push({id: 4, message: action.payload})
        }
    }
})

export default dialogsSlice.reducer

export const {setMessage} = dialogsSlice.actions