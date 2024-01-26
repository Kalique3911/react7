import React, {memo} from 'react'
import './Messages.css'
import defaultAva from '../../images/defaultAva.svg'
import {compose} from 'redux'
import {NavLink} from 'react-router-dom'

const Message = props => {
    if (props.messageType === 'head') {
        return <div className={'headMessage'}>
        <span>
            <NavLink to={'/profile/' + props.id}>
                <img src={props.photo ? props.photo : defaultAva} alt={'ava'}/>
            </NavLink>
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
                {props.text}
            </div>
        </div>
    }
}

export default compose(memo)(Message)