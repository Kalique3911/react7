import React from 'react'

const ProfileStatusHooks = (props) => {
    return <div>
        {<div>
            <span> {props.status || '---'}</span>
        </div>}
        {<div>
            <input/>
        </div>}
    </div>
}

export default ProfileStatusHooks