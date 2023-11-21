import React, {memo, useEffect, useState} from 'react'
import {compose} from 'redux'
import {useGetUserStatusQuery, usePassUserStatusMutation} from '../../../../API/profileAPI'
import {useForm} from 'react-hook-form'

const ProfileStatus = props => {
    let [userId, setUserId] = useState(props.userId)
    let [editMode, setEditMode] = useState(false)
    const status = useGetUserStatusQuery(userId ? userId : props.authUserId).data
    const [passUserStatus] = usePassUserStatusMutation()
    const refetch = useGetUserStatusQuery(userId ? userId : props.authUserId).refetch
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange',//todo sdielaj
        defaultValues: async () => {
            await status
            return {status: status}
        }
    })
    debugger
    useEffect(() => {
        setUserId(props.userId)
        // setEditMode(false)
    }, [props.userId])

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
        await passUserStatus({status: data.status})
        refetch() //eto nuzhno iz-za togo, chto v deactivateEditMode nie mieniajet'sia state
    }

    return <div>
        {!editMode && <div>
            <span onDoubleClick={activateEditMode}> {status || '---'}</span>
        </div>}
        {editMode && <div>
            <form>
                <input {...register('status', {
                    onBlur: handleSubmit(deactivateEditMode),
                    maxLength: {value: 300, message: 'max length is 300'}
                })}></input>
                {errors.status && <div style={{color: 'red'}}>{errors.status.message}</div>}
            </form>
        </div>}
    </div>
}

export default compose(memo)(ProfileStatus)