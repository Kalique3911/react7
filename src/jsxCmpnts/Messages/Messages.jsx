import classes from "./Messages.module.css";
import React from "react";
import Message from "./Message/Message";

const Messages = (props) => {
    return <div className={classes.messages}>
        <div>
            <h3>{props.state.name}</h3>
        </div>
        <div>
            {props.state.messagesData.map(el => <Message text={el.message}/>)}
        </div>
    </div>
}

export default Messages