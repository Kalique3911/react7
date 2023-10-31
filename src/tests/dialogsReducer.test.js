import dialogsReducer, {addMessage} from '../redux/dialogsReducer'

it('kakatest', () => {
    let newState = dialogsReducer({
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
    }, addMessage('kal'))

    expect(newState.messagesData[3].message).toBe('kal')
})