import classes from "./Messages.module.css";
import React from "react";
import Message from "./Message/Message";
import {addMessageActionCreator, updateNewMessageTextActionCreator,} from "../../redux/dialogsReducer";

const Messages = (props) => {

    let newMessageElement = React.createRef()

    let onMessageChange = () => {
        props.dispatch(updateNewMessageTextActionCreator(newMessageElement.current.value))
    }
    return <div className={classes.messages}>
        <div>
            <h3>{props.state.usersData[0].name}</h3>
        </div>
        <div>
            {props.state.messagesData.map(el => <Message text={el.message}/>)}
        </div>
        <div>
            <textarea onChange={onMessageChange} ref={newMessageElement} value={props.state.newMessageText}/>
        </div>
        <div>
            <button onClick={() => {
                props.dispatch(addMessageActionCreator(newMessageElement.current.value))
            }}>add Message
            </button>
        </div>
    </div>
}

export default Messages