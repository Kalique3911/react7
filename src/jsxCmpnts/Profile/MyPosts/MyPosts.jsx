import React from 'react'
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return <div className={classes.item}>
        my posts
        <div>
            <textarea></textarea>
            <button>Add post</button>
            <button>Remove post</button>
        </div>
        <Post message='Pillaging Balkans' likes='15 likes '/>
        <Post message='Besieging Constantinople' likes='20 likes '/>
    </div>
}

export default MyPosts