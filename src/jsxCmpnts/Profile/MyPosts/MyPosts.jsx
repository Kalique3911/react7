import React from 'react'
import classes from './MyPosts.module.css'
import Post from "../Post/Post";

const MyPosts = (props) => {
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
            {props.postData.map(el => <Post text={el.text} likes={el.likes}/>)}
        </div>
    </div>
}

export default MyPosts