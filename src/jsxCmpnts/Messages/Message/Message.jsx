import React, {memo} from 'react'
import classes from './Message.module.css'
import defaultAva from '../../../images/defaultAva.jpg'
import {compose} from 'redux'

const Message = props => {
    return <div className={classes.message}>
        <img src={defaultAva} alt={'ava'}/>
        {props.text}
    </div>
}

export default compose(memo)(Message)