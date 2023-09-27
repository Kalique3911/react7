import React from "react"
import classes from './Message.module.css'
import defaultAva from '../../../images/defaultAva.jpg'

const Message = (props) => {
    return <div className={classes.message}>
        <img src={defaultAva}/>
        {props.text}
    </div>
}

export default Message