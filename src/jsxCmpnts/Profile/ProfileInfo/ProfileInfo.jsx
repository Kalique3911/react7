import React from 'react'
import classes from './ProfileInfo.module.css'
import steppe from '../../../images/steppe.jpg'
import preloader from '../../../images/preloader.gif';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <img src={preloader}/>
    }

    return <div>
        <div>
            <img
                src={steppe}/>
        </div>
        <div className={classes.info}>
            <img src={props.profile.photos.large}/>
            <h3>{props.profile.fullName}</h3>
            <div>{props.profile.aboutMe}</div>
            <div>{props.profile.lookingForAJob ? 'ищу работу' : 'не ищу работу'}</div>
            <div>{props.profile.lookingForAJobDescription}</div>
            ava + dsc
        </div>
    </div>
}

export default ProfileInfo