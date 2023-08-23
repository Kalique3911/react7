import React from "react"
import classes from './Dialogs.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";

const Dialogs = (props) => {
    return <div className={classes.content}>
        <div className={classes.page}>
            <div className={classes.dialogs}>
                {props.state.dialogs.dialogsData.map(el => <Dialog name={el.name} id={el.id}/>)}
            </div>
            <div className={classes.messages}>
                {props.state.dialogs.messagesData.map(el => <Message text={el.message}/>)}
            </div>
        </div>
    </div>
}

export default Dialogs