import React from "react"
import classes from './Message.module.css'
import pheodosij from '../../../images/defaultAva.jpg'

const Message = (props) => {
    return <div className={classes.message}>
        <img src={pheodosij}/>
        {props.text}
    </div>
}

export default Message