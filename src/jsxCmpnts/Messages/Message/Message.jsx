import React, {memo} from 'react'
import './Message.css'
import defaultAva from '../../../images/defaultAva.jpg'
import {compose} from 'redux'

const Message = props => {
    if (props.messageType === 'head') {
        return <div className={'headMessage'}>
        <span>
            <img src={props.photo ? props.photo : defaultAva} alt={'ava'}/>
        </span>
            <div>
                <div style={{fontWeight: 'bold', fontSize: '15px'}}>
                    {props.userName}
                </div>
                <div style={{marginTop: '10px'}}>
                    {props.text}
                </div>
            </div>
        </div>
    } else {
        return <div className={'normalMessage'}>
            <span>
            </span>
            <div>
                <div>
                    {props.text}
                </div>
            </div>
        </div>
    }

}

export default compose(memo)(Message)