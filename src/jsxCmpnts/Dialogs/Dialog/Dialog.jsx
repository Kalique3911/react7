import React, {memo} from 'react'
import classes from './Dialog.module.css'
import {NavLink} from 'react-router-dom'
import {compose} from 'redux'

const Dialog = props => {
    return <div className={classes.dialog}>
        <NavLink to={'dialog/' + props.id}>{props.name}</NavLink>
    </div>
}
export default compose(memo)(Dialog)