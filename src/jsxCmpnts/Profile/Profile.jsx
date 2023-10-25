import React, {memo} from 'react'
import classes from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {compose} from 'redux'
import MyPosts from './MyPosts/MyPosts'

const Profile = (props) => {
    return <div className={classes.content}>
        <ProfileInfo/>
        <MyPosts/>
    </div>
}

export default compose(memo)(Profile)