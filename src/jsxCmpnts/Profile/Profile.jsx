import React, {memo} from 'react'
import './Profile.css'
import {compose} from 'redux'
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
import download from '../../images/download.png'

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
    const [aboutMeLength, setAboutMeLength] = useState(0)
    const [lookingForAJobDescriptionLength, setLookingForAJobDescriptionLength] = useState(0)
    const [hover, setHover] = useState(false)

    const {register, handleSubmit, formState: {errors}, watch} = useForm({
        mode: 'onChange', defaultValues: async () => {
            const reqId = await getReqId(undefined, {
                skip: !isAuth
            }).unwrap()
            const reqProfile = await getProfile(reqId, {
                skip: !reqId
            }).unwrap()
            return {
                fullName: reqProfile.fullName,
                aboutMe: reqProfile.aboutMe,
                lookingForAJob: reqProfile.lookingForAJob,
                lookingForAJobDescription: reqProfile.lookingForAJobDescription,
                github: reqProfile.contacts.github,
                vk: reqProfile.contacts.vk,
                facebook: reqProfile.contacts.facebook,
                instagram: reqProfile.contacts.instagram,
                twitter: reqProfile.contacts.twitter,
                website: reqProfile.contacts.website,
                youtube: reqProfile.contacts.youtube,
                mainLink: reqProfile.contacts.mainLink
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

    watch((data) => {
        if (data.aboutMe) {
            setAboutMeLength(data.aboutMe.length)
        }
    })
    watch((data) => {
        if (data.lookingForAJobDescription) {
            setLookingForAJobDescriptionLength(data.lookingForAJobDescription.length)
        }
    })

    if (!profile) {
        return <img src={preloader} alt={'preloader'}/>
    }

    return <div className={'profile'}>
        <div>
            <div className={'head'}>
                <div>
                    <div className={'download'}>
                        <img src={download}/>
                    </div>
                    <img src={profile.photos.large ? profile.photos.large : defaultAva} alt={'large userPhoto'}/>
                </div>
                <span className={'separator'}></span>
                <h3>{profile.fullName}</h3>
                <ProfileStatus userId={userId} authUserId={authUserId}/>
            </div>
            <div className={classNames({
                'info': true,
                'noInfo': !profile.aboutMe && !profile.lookingForAJob && !profile.lookingForAJobDescription && !Object.values(profile.contacts).some(c => c) && !(authUserId === userId)
            })}>
                {!editMode && <div>
                    <div className={'infoItem'}>
                        <div>About me:</div>
                        <span>{profile.aboutMe}</span>
                    </div>
                    {profile.lookingForAJob && <span className={'separator'}></span>}
                    <div className={'infoItem'}>
                        <div>{profile.lookingForAJob && 'I am looking for a job!'}</div>
                    </div>
                    {profile.lookingForAJob && <div className={'infoItem'}>
                        <div>My professional skills:</div>
                        <span>{profile.lookingForAJobDescription}</span>
                    </div>}
                    {Object.values(profile.contacts).some(c => c) && <span className={'separator'}></span>}
                    {Object.keys(profile.contacts).map(k => {
                        contactCount += 1
                        if (Object.values(profile.contacts)[contactCount]) {
                            return <div className={'infoItem'}>
                                <div>{`${k}: `}</div>
                                <span>
                                    <a href={`${Object.values(profile.contacts)[contactCount]}`}>{Object.values(profile.contacts)[contactCount]}</a>
                                </span>
                            </div>
                        } else return null
                    })}
                    {(userId === authUserId.toString()) && <div className={'infoItem'}>
                        <div></div>
                        <div>
                            <button onClick={() => setEditMode(true)}>Edit</button>
                        </div>
                    </div>}
                </div>}
                {editMode && <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={'infoItem'}>
                        <div>Name:</div>
                        <input {...register('fullName', {
                            required: 'field is required', maxLength: {value: 80, message: 'max length is 50'}
                        })}/>
                    </div>
                    {errors.fullName && <div className={'infoItem'} style={{color: 'red'}}>
                        <div>error:</div>
                        <span style={{color: 'red'}}>{errors.fullName.message}</span>
                    </div>}
                    <div className={'infoItem'}>
                        <div>About me:</div>
                        <textarea {...register('aboutMe', {
                            required: 'field is required', maxLength: {value: 300, message: 'max length is 300'}
                        })}/>
                        {300 - aboutMeLength && <div className={'lengthCounter'}>{`${300 - aboutMeLength}`}</div>}
                    </div>
                    {errors.aboutMe && <div className={'infoItem'} style={{color: 'red'}}>
                        <div>error:</div>
                        <span style={{color: 'red'}}>{errors.aboutMe.message}</span>
                    </div>}
                    <span className={'separator'}></span>
                    <div className={'infoItem'}>
                        <div>Looking for a job?</div>
                        <input type={'checkbox'} {...register('lookingForAJob')}/>
                    </div>
                    <div className={'infoItem'}>
                        <div>My professional skills:</div>
                        <textarea {...register('lookingForAJobDescription', {
                            required: 'field is required', maxLength: {value: 300, message: 'max length is 300'}
                        })}/>
                        {300 - lookingForAJobDescriptionLength &&
                            <div className={'lengthCounter'}>{`${300 - lookingForAJobDescriptionLength}`}</div>}
                    </div>
                    <span className={'separator'}></span>
                    {Object.keys(profile.contacts).map(k => {
                        return <div className={'infoItem'}>
                            <div>{`${k}: `}</div>
                            <div>
                                <input {...register(`${k}`, {
                                    pattern: {
                                        value: /^(ftp|http|https):\/\/[^ "]+$/
                                    }, maxLength: {
                                        value: 100
                                    }
                                })}/>
                                {Object.keys(errors).find(key => key === `${k}`) &&
                                    <div style={{color: 'red', float: 'left'}}>
                                        <span style={{fontWeight: 'bold'}}>error: </span>
                                        <span>enter valid link</span>
                                    </div>}
                            </div>
                        </div>
                    })}
                    <div className={'infoItem'}>
                        <div></div>
                        <div>
                            <button>Submit</button>
                        </div>
                    </div>
                </form>}
            </div>
        </div>
    </div>
}

export default compose(withAuthNavigate, memo)(Profile)
