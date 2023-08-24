import React from 'react'
import classes from './ProfileInfo.module.css'
import steppe from '../../../images/steppe.jpg'

const ProfileInfo = () => {
    return <div>
        <div>
            <img
                src={steppe}/>
        </div>
        <div className={classes.info}>
            ava + dsc
        </div>
    </div>
}

export default ProfileInfo