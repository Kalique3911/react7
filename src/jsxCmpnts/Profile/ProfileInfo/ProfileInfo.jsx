import React from 'react'
import classes from './ProfileInfo.module.css'
import preloader from '../../../images/preloader.gif'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import {useSelector} from 'react-redux'
import {getProfile} from '../../../redux/selectors'

const ProfileInfo = (props) => {

    const profile = useSelector((state) => getProfile(state))


    if (!profile) {
        return <img src={preloader} alt={'preloader'}/>
    }

    return <div>
        <div className={classes.info}>
            <img src={profile.photos.large} alt={'large photo'}/>
            <h3>{profile.fullName}</h3>
            <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}
                           userId={props.userId} authUserId = {props.authUserId}
            />
            <div>{profile.aboutMe}</div>
            <div>{profile.lookingForAJob ? 'ищу работу' : 'не ищу работу'}</div>
            <div>{profile.lookingForAJobDescription}</div>
        </div>
    </div>
}

export default ProfileInfo