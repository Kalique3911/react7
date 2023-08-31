import React from "react"
import classes from './Dialogs.module.css'
import Dialog from "./Dialog/Dialog";

const Dialogs = (props) => {
    return <div className={classes.content}>
        <div className={classes.page}>
            <div className={classes.dialogs}>
                {props.state.dialogs.usersData.map(el => <Dialog name={el.name} id={el.id}/>)}
            </div>
        </div>
    </div>
}

export default Dialogs
