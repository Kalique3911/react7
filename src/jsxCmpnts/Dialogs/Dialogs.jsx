import React from "react"
import classes from './Dialogs.module.css'

const Dialogs = () => {
    return <div className={classes.content}>
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                <div className={classes.dialog}>
                    Feodosij
                </div>
                <div className={classes.dialog}>
                    Bleda
                </div>
                <div className={classes.dialog}>
                    Ellac
                </div>
                <div className={classes.dialog}>
                    Flavius
                </div>
            </div>
            <div className={classes.messages}>
                <div className={classes.message}>Hi</div>
                <div className={classes.message}>Stop your business</div>
                <div className={classes.message}>I offer you gold</div>
            </div>
        </div>
    </div>
}

export default Dialogs