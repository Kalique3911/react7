import classes from "./Messages.module.css";
import React from "react";
import Message from "./Message/Message";
import {Navigate} from 'react-router-dom';

const Messages = (props) => {

    const newMessageElement = React.createRef()

    if (!props.isAuth) {
        return <Navigate to={'/login'}/>
    }

    return <div className={classes.messages}>
        <div>
            <h3>{props.name}</h3>
        </div>
        <div>
            {props.messagesData.map(el => <Message key={el.id} text={el.message}/>)}
        </div>
        <div>
            <textarea onChange={() => props.updateNewMessageElement(newMessageElement.current.value)} ref={newMessageElement}
                      value={props.newMessageText}/>
        </div>
        <div>
            <button onClick={() => {
                props.addMessage()
            }}>add Message
            </button>
        </div>
    </div>
}

export default Messages