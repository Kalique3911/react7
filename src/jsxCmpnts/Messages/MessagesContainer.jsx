import React from "react";
import {addMessageActionCreator, updateNewMessageTextActionCreator,} from "../../redux/dialogsReducer";
import Messages from "./Messages";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        messagesData: state.dialogs.messagesData,
        name: state.dialogs.usersData[0].name,
        newMessageText: state.dialogs.newMessageText,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageElement: (body) => {
            dispatch(updateNewMessageTextActionCreator(body))
        },
        addMessage: (body) => {
            dispatch(addMessageActionCreator(body))
        }
    }
}

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages)

export default MessagesContainer