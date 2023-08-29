import React from 'react'
import classes from './MyPosts.module.css'
import Post from "../Post/Post";

const MyPosts = (props) => {

    let newPostElement = React.createRef()

    let onPostChange = () => {
        props.updateNewPostChange(newPostElement.current.value)
    }

    return <div className={classes.item}>
        <div>
            create your new post
        </div>
        <div>
            <textarea onChange={onPostChange} ref={newPostElement} value={props.state.newPostText}/>
        </div>
        <div>
            <button onClick={() => {
                props.addPost()
            }}>Add post
            </button>
        </div>
        <div className={classes.posts}>
            {props.state.postData.map(el => <Post text={el.text} likes={el.likes}/>)}
        </div>
    </div>
}

export default MyPosts