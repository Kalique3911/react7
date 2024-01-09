import {NavLink} from 'react-router-dom'
import defaultAva from '../../images/defaultAva.jpg'
import React from 'react'
import {compose} from 'redux'
import {memo} from 'react'

function User(props) {
    console.log('rerender')
    return <div className={'user'}>
        <div>
            <NavLink to={'/profile/' + props.user.id}>
                <img src={props.user.photos.small != null ? props.user.photos.small : defaultAva} alt={'small photo'}/>
            </NavLink>
        </div>
        <span className={'uSeparator'}></span>
        <div>{props.user.name}</div>
        {props.user.status && <div className={'uStatus'}>{props.user.status}</div>}
        <div>
            {props.user.followed ? <button
                    disabled={props.followingInProgress.some(props.fn)}
                    onClick={props.onClick}
                    className={'followed'}
                >Unfollow</button>

                : <button
                    disabled={props.followingInProgress.some(props.fn)}
                    onClick={props.onClick1}
                >Follow</button>}
        </div>
    </div>
}

export default compose(memo)(User)