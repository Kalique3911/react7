import React, {memo} from 'react'
import classes from './Settings.module.css'
import {compose} from 'redux'

const Settings = props => {
    return <div className={classes.content}>
        Settings
    </div>
}

export default compose(memo)(Settings)