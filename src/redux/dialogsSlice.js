import {createSlice} from '@reduxjs/toolkit'

const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState: {
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
    },
    reducers: {
        setMessage: (state, action) => {
            state.messagesData.push({id: 4, message: action.payload})
        }
    }
})

export default dialogsSlice.reducer

export const {setMessage} = dialogsSlice.actions