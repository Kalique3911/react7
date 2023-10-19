import React from 'react'
import {addMessage} from '../../redux/dialogsReducer'
import Messages from './Messages'
import {connect} from 'react-redux'
import {withAuthNavigate} from '../../common/HOCs/withAuthNavigate'
import {compose} from 'redux'

const MessagesContainer = (props) => {
    return <Messages {...props}/>
}

const mapStateToProps = (state) => {
    return {
        messagesData: state.dialogsPage.messagesData,
        name: state.dialogsPage.usersData[0].name,
        newMessageText: state.dialogsPage.newMessageText,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (body) => {
            dispatch(addMessage(body))
        }
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthNavigate)(MessagesContainer)
