import React, {memo} from 'react'
import classes from './ProfileInfo.module.css'
import preloader from '../../../images/preloader.gif'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {withAuthNavigate} from '../../../common/HOCs/withAuthNavigate'
import {compose} from 'redux'
import {fakeIncrementor} from '../../../redux/profileSlice'
import {useGetUserProfileQuery} from '../../../API/profileAPI'
import {useGetAuthUserIdQuery} from '../../../API/authAPI'

const ProfileInfo = () => {
    const dispatch = useDispatch()
    //  beriom userId iz URL s pomosch'ju useParams
    let {userId} = useParams()

    const {data: authUserId} = useGetAuthUserIdQuery() //todo eta suka nie dielajet zapros poslie logina???
    const {data: profile} = useGetUserProfileQuery(userId ? userId : authUserId, {
        skip: !authUserId //todo pieriepisat' etu hujniu na selectFromResult
    })
    debugger
    window.authId = authUserId
    const fake = useSelector((state) => state.profilePage.fake)

    if (!profile) {
        return <img src={preloader} alt={'preloader'}/>
    }

    return <div>
        <div className={classes.info}>
            <img src={profile.photos.large} alt={'large photo'}/>
            <h3>{profile.fullName}</h3>
            <ProfileStatus userId={userId} authUserId={authUserId}/>
            <div>{profile.aboutMe}</div>
            <div>{profile.lookingForAJob ? 'ищу работу' : 'не ищу работу'}</div>
            <div>{profile.lookingForAJobDescription}</div>
            <button onClick={() => dispatch(fakeIncrementor())}>{fake}</button>
        </div>
    </div>
}

export default compose(withAuthNavigate, memo)(ProfileInfo)