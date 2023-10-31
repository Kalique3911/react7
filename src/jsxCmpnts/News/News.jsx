import React, {memo} from 'react'
import classes from './News.module.css'
import {compose} from 'redux'

const News = props => {
    return <div className={classes.content}>
        News
    </div>
}

export default compose(memo)(News)