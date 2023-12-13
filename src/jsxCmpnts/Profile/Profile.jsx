import React, {memo} from 'react'
import './Profile.css'
import {compose} from 'redux'
import MyPosts from './MyPosts/MyPosts'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {getIsAuth} from '../../selectors/authSelectors'
import {useGetAuthUserIdQuery, useLazyGetAuthUserIdQuery} from '../../API/authAPI'
import {useGetUserProfileQuery, useLazyGetUserProfileQuery, usePassUserProfileMutation} from '../../API/profileAPI'
import preloader from '../../images/preloader.gif'
import defaultAva from '../../images/defaultAva.jpg'
import ProfileStatus from './ProfileInfo/ProfileStatus/ProfileStatus'
import {withAuthNavigate} from '../../common/HOCs/withAuthNavigate'
import classNames from 'classnames'
import {useState} from 'react'
import {useForm} from 'react-hook-form'

const Profile = props => {
    //  beriom userId iz URL s pomosch'ju useParams
    let {userId} = useParams()
    let [editMode, setEditMode] = useState(false)
    let contactCount = -1
    const isAuth = useSelector((state) => getIsAuth(state))
    const {data: authUserId} = useGetAuthUserIdQuery(undefined, {
        refetchOnMountOrArgChange: true, skip: !isAuth
    })
    const {data: profile, refetch} = useGetUserProfileQuery(userId ? userId : authUserId, {
        skip: !authUserId
    })
    const [getProfile] = useLazyGetUserProfileQuery()
    const [getReqId] = useLazyGetAuthUserIdQuery()
    const [passUserProfile] = usePassUserProfileMutation()

    const {register, handleSubmit, formState: {errors}, watch} = useForm({
        mode: 'onChange', defaultValues: async () => {
            debugger
            const reqId = await getReqId(undefined, {
                skip: !isAuth
            }).unwrap()
            const reqProfile = await getProfile(reqId, {
                skip: !reqId
            }).unwrap()
            return {
                fullName: reqProfile.fullName, aboutMe: reqProfile.aboutMe,
                lookingForAJob: reqProfile.lookingForAJob,
                lookingForAJobDescription: reqProfile.lookingForAJobDescription,
                github: reqProfile.contacts.github, vk: reqProfile.contacts.vk,
                facebook: reqProfile.contacts.facebook, instagram: reqProfile.contacts.instagram,
                twitter: reqProfile.contacts.twitter, website: reqProfile.contacts.website,
                youtube: reqProfile.contacts.youtube, mainLink: reqProfile.contacts.mainLink
            }
        }
    })

    const onSubmit = async data => {
        await passUserProfile({
            userId: authUserId,
            fullName: data.fullName,
            aboutMe: data.aboutMe,
            lookingForAJob: data.lookingForAJob,
            lookingForAJobDescription: data.lookingForAJobDescription,
            contacts: {
                github: data.github,
                vk: data.vk,
                facebook: data.facebook,
                instagram: data.instagram,
                twitter: data.twitter,
                website: data.website,
                youtube: data.youtube,
                mainLink: data.mainLink
            }
        })
        setEditMode(false)
        refetch()
    }

    if (!profile) {
        return <img src={preloader} alt={'preloader'}/>
    }

    return <div className={'profile'}>
        <div>
            <div className={'head'}>
                <img src={profile.photos.large ? profile.photos.large : defaultAva} alt={'large userPhoto'}/>
                <span className={'separator'}></span>
                <h3>{profile.fullName}</h3>
                <ProfileStatus userId={userId} authUserId={authUserId}/>
            </div>
            <div className={classNames({
                'info': true,
                'noInfo': !profile.aboutMe && !profile.lookingForAJob && !profile.lookingForAJobDescription && !Object.values(profile.contacts).some(c => c) && !(authUserId === userId)
            })}>
                {!editMode && <div>
                    <div>about me: <span>{profile.aboutMe}</span></div>
                    {profile.lookingForAJob && <span className={'separator'}></span>}
                    <div>{profile.lookingForAJob && 'looking for a job'}</div>
                    <div>my professional
                        skills: <span>{profile.lookingForAJob && profile.lookingForAJobDescription}</span></div>
                    {Object.values(profile.contacts).some(c => c) && <span className={'separator'}></span>}
                    {Object.keys(profile.contacts).map(k => {
                        contactCount += 1
                        if (Object.values(profile.contacts)[contactCount]) {
                            return <div>{`${k}: `}<a
                                href={`${Object.values(profile.contacts)[contactCount]}`}>{Object.values(profile.contacts)[contactCount]}</a>
                            </div>
                        } else return <div></div>
                    })}
                    {(userId ? userId.toString() : authUserId  === authUserId) && <button onClick={() => setEditMode(true)}>edit</button>}
                </div>}
                {editMode && <form onSubmit={handleSubmit(onSubmit)}>
                    <div>name: <input {...register('fullName', {
                        maxLength: {value: 80, message: 'max length is 50'}
                    })}/></div>
                    <div>about me: <input {...register('aboutMe', {
                        maxLength: {value: 300, message: 'max length is 300'}
                    })}/></div>
                    <span className={'separator'}></span>
                    <div>{'looking for a job?'}<input type={'checkbox'} {...register('lookingForAJob')}/></div>
                    <div>my professional skills: <input {...register('lookingForAJobDescription', {
                        maxLength: {value: 300, message: 'max length is 300'}
                    })}/></div>
                    <span className={'separator'}></span>
                    {Object.keys(profile.contacts).map(k => {
                        return <div>{`${k}: `}<input {...register(`${k}`, {
                            maxLength: {
                                value: 100, message: 'max length is 100'
                            }
                        })}/></div>
                    })}
                    <button>send</button>
                </form>}
            </div>
        </div>
        <MyPosts fullName={profile.fullName} smallPhoto={profile.photos.small}/>
    </div>
}

export default compose(withAuthNavigate, memo)(Profile)
