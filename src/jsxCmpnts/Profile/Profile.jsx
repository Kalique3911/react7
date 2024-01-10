import React, {memo, useState} from 'react'
import './Profile.css'
import {compose} from 'redux'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {getIsAuth} from '../../selectors/authSelectors'
import {useGetAuthUserIdQuery, useLazyGetAuthUserIdQuery} from '../../API/authAPI'
import {
    useGetUserProfileQuery,
    useLazyGetUserProfileQuery,
    usePassUserPhotoMutation,
    usePassUserProfileMutation
} from '../../API/profileAPI'
import {withAuthNavigate} from '../../common/HOCs/withAuthNavigate'
import {useForm} from 'react-hook-form'
import ProfileInfo from './ProfileInfo'
import ProfileHead from './ProfileHead'

const Profile = () => {
    let {userId} = useParams()
    let [editMode, setEditMode] = useState(false)
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
    const [passUserPhoto] = usePassUserPhotoMutation()
    const [aboutMeLength, setAboutMeLength] = useState(0)
    const [lookingForAJobDescriptionLength, setLookingForAJobDescriptionLength] = useState(0)

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
    const onImageChange = async data => {
        const formData = new FormData()
        formData.append('files', data.image[0])
        await passUserPhoto(formData)
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
        return <></>
    }

    return <div className={'profile'}>
        <ProfileHead userId={userId} authUserId={authUserId}
                     register={register('image', {onChange: handleSubmit(onImageChange)})} profile={profile}/>
        <ProfileInfo profile={profile} predicate={c => c} authUserId={authUserId} userId={userId} editMode={editMode}
                     onClick={() => setEditMode(true)} onSubmit={handleSubmit(onSubmit)}
                     register={register('fullName', {
                         required: 'field is required', maxLength: {value: 80, message: 'max length is 50'}
                     })} errors={errors} register1={register('aboutMe', {
            required: 'field is required', maxLength: {value: 300, message: 'max length is 300'}
        })} aboutMeLength={aboutMeLength} register2={register('lookingForAJob')}
                     register3={register('lookingForAJobDescription', {
                         required: 'field is required', maxLength: {value: 300, message: 'max length is 300'}
                     })} lookingForAJobDescriptionLength={lookingForAJobDescriptionLength} callbackfn1={k => {
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
        }}/>
    </div>
}

export default compose(withAuthNavigate, memo)(Profile)
