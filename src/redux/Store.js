import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

let store = {
    state: {
        profile: {
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
        },
        dialogs: {
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
        },
    },
}

window.store = store
export default store