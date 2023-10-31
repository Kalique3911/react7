import React, {memo} from 'react'
import classes from './Music.module.css'
import {compose} from 'redux'

const Music = props => {
    return <div className={classes.content}>
        Music
    </div>
}

export default compose(memo)(Music)