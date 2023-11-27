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
import {getIsAuth} from '../../../selectors/authSelectors'

const ProfileInfo = () => {
    const dispatch = useDispatch()
    //  beriom userId iz URL s pomosch'ju useParams
    let {userId} = useParams()

    const isAuth = useSelector((state) => getIsAuth(state))
    const {data: authUserId} = useGetAuthUserIdQuery(undefined, {
        refetchOnMountOrArgChange: true,
        skip: !isAuth
    })
    const {data: profile} = useGetUserProfileQuery(userId ? userId : authUserId, {
        skip: !authUserId
    })

    const fake = useSelector((state) => state.profilePage.fake)

    if (!profile) {
        return <img src={preloader} alt={'preloader'}/>
    }

    return <div className={classes.info}>
        <img src={profile.photos.large} alt={'large photo'}/>
        <h3>{profile.fullName}</h3>
        <ProfileStatus userId={userId} authUserId={authUserId}/>
        <div>
            <p>{profile.aboutMe}</p>
            <p>{profile.lookingForAJob ? 'ищу работу' : 'не ищу работу'}</p>
            <p>{profile.lookingForAJobDescription}</p>
        </div>
        <div>
            <button onClick={() => dispatch(fakeIncrementor())}>{fake}</button>
        </div>
    </div>
}

export default compose(withAuthNavigate, memo)(ProfileInfo)