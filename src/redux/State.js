const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_CHANGE = 'UPDATE-NEW-POST-CHANGE'

let store = {
    state: {
        profile: {
            postData: [{id: 1, text: 'Pillaging Balkans', likes: '15 likes '}, {
                id: 2,
                text: 'Besieging Constantinople',
                likes: '20 likes '
            }, {id: 3, text: 'Moving to Gallia', likes: '5 likes '},], newPostText: 'kal',
        }, dialogs: {
            dialogsData: [{
                id: 1,
                name: "Feodosij",
                messagesData: [{id: 1, message: "Hi"}, {id: 2, message: "Stop your business"}, {
                    id: 3, message: "I offer you gold"
                },],
                addFunction() {
                    const newMessage = {
                        id: 4, message: this.state.dialogs.dialogsData[0].newMessageText,
                    }
                    this.state.dialogs.dialogsData[0].messagesData.push(newMessage)
                    this.state.dialogs.dialogsData[0].newMessageText = ''
                    this.rerender(this.state)
                },
                updateFunction(newText) {
                    this.state.dialogs.dialogsData[0].newMessageText = (newText)
                    this.rerender(this.state)
                },
                newMessageText: 'kal'
            }, {
                id: 2, name: "Bleda", messagesData: [{id: 1, message: "Lol"}], addFunction: () => {
                    const newMessage = {
                        id: 4, message: this.state.dialogs.dialogsData[1].newMessageText,
                    }
                    this.state.dialogs.dialogsData[1].messagesData.push(newMessage)
                    this.state.dialogs.dialogsData[1].newMessageText = ''
                    this.rerender(this.state)
                }, updateFunction: (newText) => {
                    this.state.dialogs.dialogsData[1].newMessageText = (newText)
                    this.rerender(this.state)
                }, newMessageText: 'kal'
            }, {
                id: 3, name: "Ellac", messagesData: [], addFunction: () => {
                    const newMessage = {
                        id: 4, message: this.state.dialogs.dialogsData[2].newMessageText,
                    }
                    this.state.dialogs.dialogsData[2].messagesData.push(newMessage)
                    this.state.dialogs.dialogsData[2].newMessageText = ''
                    this.rerender(this.state)
                }, updateFunction: (newText) => {
                    this.state.dialogs.dialogsData[2].newMessageText = (newText)
                    this.rerender(this.state)
                }, newMessageText: 'kal'
            }, {
                id: 4, name: "Flavius", messagesData: [], addFunction: () => {
                    const newMessage = {
                        id: 4, message: this.state.dialogs.dialogsData[3].newMessageText,
                    }
                    this.state.dialogs.dialogsData[3].messagesData.push(newMessage)
                    this.state.dialogs.dialogsData[3].newMessageText = ''
                    this.rerender(this.state)
                }, updateFunction: (newText) => {
                    this.state.dialogs.dialogsData[3].newMessageText = (newText)
                    this.rerender(this.state)
                }, newMessageText: 'kal'
            },

            ],
        },
    }, getState() {
        return this.state
    }, rerender() {

    }, addPost() {
        const newPost = {
            id: 5, text: this.state.profile.newPostText, likes: "0 likes "
        }
        this.state.profile.postData.push(newPost)
        this.state.profile.newPostText = ''
        this.rerender(this.state)
    }, updateNewPostChange(newText) {
        this.state.profile.newPostText = newText
        this.rerender(this.state)
    }, subscribe(obdrister) {
        this.rerender = obdrister
    }, dispatch(action) {
        if (action.type === 'ADD-POST') {
            const newPost = {
                id: 5, text: this.state.profile.newPostText, likes: "0 likes "
            }
            this.state.profile.postData.push(newPost)
            this.state.profile.newPostText = ''
            this.rerender(this.state)
        } else if (action.type === 'UPDATE-NEW-POST-CHANGE') {
            this.state.profile.newPostText = action.newText
            this.rerender(this.state)
        }
    }

}

export const addPostActionCreator = () => ({type: ADD_POST})

export const updateNewPostTextActionCreator = text => ({type: UPDATE_NEW_POST_CHANGE, newText: text})



window.store = store
export default store