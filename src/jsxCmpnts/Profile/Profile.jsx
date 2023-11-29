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
import ProfileStatus from './ProfileInfo/ProfileStatus/ProfileStatus'
import {fakeIncrementor} from '../../redux/profileSlice'
import {withAuthNavigate} from '../../common/HOCs/withAuthNavigate'

const Profile = props => {
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

    return <div className={classes.content}>
        <div className={classes.info}>
            <img src={profile.photos.large} alt={'large userPhoto'}/>
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
        <MyPosts fullName={profile.fullName} smallPhoto={profile.photos.small}/>
    </div>
}

export default compose(withAuthNavigate, memo)(Profile)