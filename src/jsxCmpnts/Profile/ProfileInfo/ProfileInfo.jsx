import React from 'react'
import classes from './ProfileInfo.module.css'
import preloader from '../../../images/preloader.gif'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import ProfileStatusHooks from './ProfileStatus/ProfileStatusHooks'

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <img src={preloader} alt={'preloader'}/>
    }

    return <div>
        <div className={classes.info}>
            <img src={props.profile.photos.large} alt={'large photo'}/>
            <h3>{props.profile.fullName}</h3>
            <ProfileStatusHooks status={props.status} updateUserStatus={props.updateUserStatus}
                           userId={props.userId} authUserId = {props.authUserId}
            />
            <div>{props.profile.aboutMe}</div>
            <div>{props.profile.lookingForAJob ? 'ищу работу' : 'не ищу работу'}</div>
            <div>{props.profile.lookingForAJobDescription}</div>
        </div>
    </div>
}

export default ProfileInfo