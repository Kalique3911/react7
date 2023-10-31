import React, {memo, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {compose} from 'redux'
import {setUserStatus} from '../../../../redux/profileSlice'

const ProfileStatus = props => {
    console.log('rerender status')

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    let [userId, setUserId] = useState(props.userId)
    const dispatch = useDispatch()

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
        dispatch(setUserStatus(status))
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

export default compose(memo)(ProfileStatus)