import React from 'react'
import classes from './ProfileInfo.module.css'
import preloader from '../../../images/preloader.gif'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import {useDispatch, useSelector} from 'react-redux'
import {getAuthUserId, getProfile, getStatus} from '../../../redux/selectors'
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {getUserProfile, setUserStatus} from '../../../redux/profileReducer'
import {withAuthNavigate} from '../../../common/HOCs/withAuthNavigate'
import {compose} from 'redux'

const ProfileInfo = (props) => {
    const dispatch = useDispatch()
    //  beriom userId iz URL s pomosch'ju useParams
    let {userId} = useParams()

    const authUserId = useSelector((state) => getAuthUserId(state))

    useEffect(() => {
        if (!userId) {
            userId = authUserId
        }

        dispatch(getUserProfile(userId))
        dispatch(setUserStatus(userId))
    }, [authUserId, userId])

    const profile = useSelector((state) => getProfile(state))
    const status = useSelector((state) => getStatus(state))

    if (!profile) {
        return <img src={preloader} alt={'preloader'}/>
    }

    return <div>
        <div className={classes.info}>
            <img src={profile.photos.large} alt={'large photo'}/>
            <h3>{profile.fullName}</h3>
            <ProfileStatus status={status}
                           userId={userId} authUserId = {authUserId}
            />
            <div>{profile.aboutMe}</div>
            <div>{profile.lookingForAJob ? 'ищу работу' : 'не ищу работу'}</div>
            <div>{profile.lookingForAJobDescription}</div>
        </div>
    </div>
}

export default compose(withAuthNavigate)(ProfileInfo)