import React from 'react'
import classes from './Dialogs.module.css'
import Dialog from './Dialog/Dialog'
import {Navigate} from 'react-router-dom'

const Dialogs = (props) => {

    if (!props.isAuth) {
        return <Navigate to={'/login'}/>
    }

    return <div className={classes.content}>
        <div className={classes.page}>
            <div className={classes.dialogs}>
                {props.usersData.map(el => <Dialog key={el.id} name={el.name} id={el.id}/>)}
            </div>
        </div>
    </div>
}

export default Dialogs
