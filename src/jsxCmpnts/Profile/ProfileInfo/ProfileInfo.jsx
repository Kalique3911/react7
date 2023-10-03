import React from 'react'
import classes from './ProfileInfo.module.css'
import steppe from '../../../images/steppe.jpg'
import preloader from '../../../images/preloader.gif'
import ProfileStatus from './ProfileStatus/ProfileStatus'

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <img src={preloader}/>
    }

    return <div>
        {/*<div>*/}
        {/*    <img*/}
        {/*        src={steppe}/>*/}
        {/*</div>*/}
        <div className={classes.info}>
            <img src={props.profile.photos.large}/>
            <h3>{props.profile.fullName}</h3>
            <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>
            <div>{props.profile.aboutMe}</div>
            <div>{props.profile.lookingForAJob ? 'ищу работу' : 'не ищу работу'}</div>
            <div>{props.profile.lookingForAJobDescription}</div>
        </div>
    </div>
}

export default ProfileInfo