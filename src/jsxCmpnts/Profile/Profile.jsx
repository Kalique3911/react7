import React, {memo} from 'react'
import classes from './Profile.module.css'
import {compose} from 'redux'
import MyPosts from './MyPosts/MyPosts'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {getIsAuth} from '../../selectors/authSelectors'
import {useGetAuthUserIdQuery} from '../../API/authAPI'
import {useGetUserProfileQuery} from '../../API/profileAPI'
import preloader from '../../images/preloader.gif'
import defaultAva from '../../images/defaultAva.jpg'
import ProfileStatus from './ProfileInfo/ProfileStatus/ProfileStatus'
import {withAuthNavigate} from '../../common/HOCs/withAuthNavigate'

const Profile = props => {
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

    if (!profile) {
        return <img src={preloader} alt={'preloader'}/>
    }

    return <div className={classes.content}>
        <div className={classes.info}>
            <img src={profile.photos.large ? profile.photos.large : defaultAva} alt={'large userPhoto'}/>
            <h3>{profile.fullName}</h3>
            <ProfileStatus userId={userId} authUserId={authUserId}/>
            <div>
                <p>{profile.aboutMe}</p>
                <p>{profile.lookingForAJob ? 'ищу работу' : 'не ищу работу'}</p>
                <p>{profile.lookingForAJobDescription}</p>
            </div>
        </div>
        <MyPosts fullName={profile.fullName} smallPhoto={profile.photos.small}/>
    </div>
}

export default compose(withAuthNavigate, memo)(Profile)