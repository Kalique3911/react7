import React from 'react'
import classes from './Profile.module.css'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfoContainer from './ProfileInfo/ProfileInfoContainer'

const Profile = (props) => {
    return <div className={classes.content}>
        <ProfileInfoContainer/>
        <MyPostsContainer/>
    </div>
}

export default Profile