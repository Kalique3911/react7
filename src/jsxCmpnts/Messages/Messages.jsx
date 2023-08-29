import classes from "./Messages.module.css";
import React from "react";
import Message from "./Message/Message";

const Messages = (props) => {

    let newMessageElement = React.createRef()

    let onMessageChange = () => {
        props.updateFunction(newMessageElement.current.value)
    }
    return <div className={classes.messages}>
        <div>
            <h3>{props.state.name}</h3>
        </div>
        <div>
            {props.state.messagesData.map(el => <Message text={el.message}/>)}
        </div>
        <div>
            <textarea onChange={onMessageChange} ref={newMessageElement} value={props.state.newMessageText}/>
        </div>
        <div>
            <button onClick={() => {
                props.addFunction()
            }}>add Message
            </button>
        </div>
    </div>
}

export default Messages