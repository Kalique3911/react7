import download from '../../images/download.png'
import defaultAva from '../../images/defaultAva.svg'
import ProfileStatus from './ProfileStatus'
import React, {memo} from 'react'
import {compose} from 'redux'

const ProfileHead = props => {
    return <div className={'head'}>
        <div>
            {(props.userId === props.authUserId.toString()) && <form className={'download'}>
                <img src={download} className={'downloadImg'} alt={'download'}/>
                <input type={'file'} className={'avaInput'}
                       accept={'image/*'} {...props.imageRegister}/>
            </form>}
            <img src={props.ava ? props.ava : defaultAva} className={'headImg'} alt={'large userPhoto'}/>
        </div>
        <span className={'separator'}></span>
        <h3>{props.fullName}</h3>
        <ProfileStatus userId={props.userId} authUserId={props.authUserId}/>
    </div>
}

export default compose(memo)(ProfileHead)