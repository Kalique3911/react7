import React, {memo, useEffect, useState} from 'react'
import {compose} from 'redux'
import {useGetUserStatusQuery, usePassUserStatusMutation} from '../../../../API/profileAPI'

const ProfileStatus = props => {
    let [userId, setUserId] = useState(props.userId)
    let [editMode, setEditMode] = useState(false)
    const status = useGetUserStatusQuery(userId ? userId : props.authUserId).data
    let [localStatus, setStatus] = useState(status)
    const [passUserStatus] = usePassUserStatusMutation()
    const refetch = useGetUserStatusQuery(userId ? userId : props.authUserId).refetch

    useEffect(() => {
        setStatus(status)
        setUserId(props.userId)
    }, [status, props.userId])

    const activateEditMode = () => {
        if (!userId) {
            userId = props.authUserId.toString()
        }
        if (props.authUserId.toString() === userId) {
            setEditMode(true)
        }
    }

    const deactivateEditMode = async () => {
        setEditMode(false)
        await passUserStatus({status: localStatus}).unwrap()
        refetch() //eto nuzhno iz-za togo, chto v deactivateEditMode nie mieniajet'sia state
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return <div>
        {!editMode && <div>
            <span onDoubleClick={activateEditMode}> {status || '---'}</span>
        </div>}
        {editMode && <div>
            <input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={localStatus}/>
        </div>}
    </div>
}

export default compose(memo)(ProfileStatus)