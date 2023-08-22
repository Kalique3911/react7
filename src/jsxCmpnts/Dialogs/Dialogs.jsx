import React from "react"
import classes from './Dialogs.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";

const Dialogs = () => {
    return <div className={classes.content}>
        <div className={classes.page}>
            <div className={classes.dialogs}>
                <Dialog name="Feodosij" id="1"/>
                <Dialog name="Bleda" id="2"/>
                <Dialog name="Ellac" id="3"/>
                <Dialog name="Flavius" id="4"/>
            </div>
            <div className={classes.messages}>
                <Message text="Hi"/>
                <Message text="Stop your business"/>
                <Message text="I offer you gold"/>
            </div>
        </div>
    </div>
}

export default Dialogs