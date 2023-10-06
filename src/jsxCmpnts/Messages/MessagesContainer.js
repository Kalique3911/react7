import React from 'react'
import {addMessage} from '../../redux/dialogsReducer'
import Messages from './Messages'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        messagesData: state.dialogsPage.messagesData,
        name: state.dialogsPage.usersData[0].name,
        newMessageText: state.dialogsPage.newMessageText,
        isAuth: state.auth.isAuth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (body) => {
            dispatch(addMessage(body))
        }
    }
}

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages)

export default MessagesContainer