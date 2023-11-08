import React, {memo, useEffect} from 'react'
import classes from './ProfileInfo.module.css'
import preloader from '../../../images/preloader.gif'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import {useDispatch, useSelector} from 'react-redux'
import {getStatus} from '../../../selectors/profileSelectors'
import {getAuthUserId} from '../../../selectors/authSelectors'
import {useParams} from 'react-router-dom'
import {withAuthNavigate} from '../../../common/HOCs/withAuthNavigate'
import {compose} from 'redux'
import {fakeIncrementor, getUserStatus} from '../../../redux/profileSlice'
import {useGetUserProfileQuery, useGetUserStatusQuery} from '../../../API/profileAPI'

const ProfileInfo = props => {
    const dispatch = useDispatch()
    //  beriom userId iz URL s pomosch'ju useParams
    let {userId} = useParams()

    const authUserId = useSelector((state) => getAuthUserId(state))

    useEffect(() => {
        if (!userId) {
            userId = authUserId
        }

        // dispatch(getUserStatus(userId))
    }, [authUserId, userId])
    const status = useGetUserStatusQuery(userId ? userId : authUserId).data
    const {data, isLoading} = useGetUserProfileQuery(userId ? userId : authUserId)
    window.data = data
    // const status = useSelector((state) => getStatus(state))
    const fake = useSelector((state) => state.profilePage.fake)

    if (isLoading) {
        return <img src={preloader} alt={'preloader'}/>
    }

    return <div>
        <div className={classes.info}>
            <img src={data.photos.large} alt={'large photo'}/>
            <h3>{data.fullName}</h3>
            <ProfileStatus status={status} userId={userId} authUserId={authUserId}/>
            <div>{data.aboutMe}</div>
            <div>{data.lookingForAJob ? 'ищу работу' : 'не ищу работу'}</div>
            <div>{data.lookingForAJobDescription}</div>
            <button onClick={() => dispatch(fakeIncrementor())}>{fake}</button>
        </div>
    </div>
}

export default compose(withAuthNavigate, memo)(ProfileInfo)