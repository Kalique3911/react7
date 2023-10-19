import React, {useEffect, useState} from 'react'

const ProfileStatus = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    let [userId, setUserId] = useState(props.userId)

    useEffect(() => {
        setStatus(props.status)
        setUserId(props.userId)
    }, [props.status, props.userId])

    const activateEditMode = () => {
        if (!userId) {
            userId = props.authUserId.toString()
        }
        if (props.authUserId.toString() === userId) {
            setEditMode(true)
        }
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return <div>
        {!editMode && <div>
            <span onDoubleClick={activateEditMode}> {props.status || '---'}</span>
        </div>}
        {editMode && <div>
            <input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={status}/>
        </div>}
    </div>
}

export default ProfileStatus