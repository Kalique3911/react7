import React, {memo, useEffect, useState} from 'react'
import {compose} from 'redux'
import {useGetUserStatusQuery, useLazyGetUserStatusQuery, usePassUserStatusMutation} from '../../API/profileAPI'
import {useForm} from 'react-hook-form'
import './Profile.css'
import classNames from 'classnames'

const ProfileStatus = props => {
    let [userId, setUserId] = useState(props.userId)
    let [editMode, setEditMode] = useState(false)
    const status = useGetUserStatusQuery(userId ? userId : props.authUserId).data
    const [getStatus] = useLazyGetUserStatusQuery()
    const [passUserStatus] = usePassUserStatusMutation()
    const refetch = useGetUserStatusQuery(userId ? userId : props.authUserId).refetch
    let [statusLength, setStatusLength] = useState(0)

    const {register, handleSubmit, formState: {errors}, watch} = useForm({
        mode: 'onChange',
        defaultValues: async () => {
            const currentStatus = await getStatus(props.authUserId, {
                refetchOnMountOrArgChange: true, skip: !props.authUserId
            }).unwrap()
            return {status: currentStatus}
        }
    })

    useEffect(() => {
        setUserId(props.userId)
    }, [props.userId, props.authUserId])

    watch((data) => {if (data.status) {setStatusLength(data.status.length)}})
    const activateEditMode = () => {
        if (!userId) {
            userId = props.authUserId.toString()
        }
        if (props.authUserId.toString() === userId) {
            setEditMode(true)
        }
    }
    const deactivateEditMode = async data => {
        setEditMode(false)
        setStatusLength(0)
        await passUserStatus({status: data.status})
        refetch() //eto nuzhno iz-za togo, chto v deactivateEditMode nie mieniajet'sia state
    }

    return <div className={classNames({'status': status, 'noStatus': !status})}>
        {!editMode && <div>
            <span onClick={activateEditMode}> {status || 'status'}</span>
        </div>}
        {editMode && <div>
            <form>
                <input {...register('status', {
                    onBlur: handleSubmit(deactivateEditMode),
                    maxLength: {value: 190, message: 'max length is 190'}
                })} autoFocus={true}/>
                {errors.status && <div style={{color: 'red'}}>{errors.status.message}</div>}
                {190 - statusLength < 50 && <div>{`${190 - statusLength} symbols left`}</div>}
            </form>
        </div>}
    </div>
}

export default compose(memo)(ProfileStatus)