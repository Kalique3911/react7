import React, {memo} from 'react'
import './Message.css'
import defaultAva from '../../../images/defaultAva.jpg'
import {compose} from 'redux'

const Message = props => {
    return <div className={'message'}>
        <div>
            <img src={props.photo ? props.photo : defaultAva} alt={'ava'}/>
            {props.userName}
        </div>
        <div>
            {props.text}
        </div>
    </div>
}

export default compose(memo)(Message)