import React from 'react'
import classes from './MyPosts.module.css'
import Post from "../Post/Post";

const MyPosts = () => {
    return <div className={classes.item}>
        <div>
            create your new post
        </div>
        <div>
            <textarea></textarea>
        </div>
        <div>
            <button>Add post</button>
        </div>
        <div className={classes.posts}>
        <Post message='Pillaging Balkans' likes='15 likes '/>
        <Post message='Besieging Constantinople' likes='20 likes '/>
        </div>
    </div>
}

export default MyPosts