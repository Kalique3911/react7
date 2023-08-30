import React from 'react'
import classes from './MyPosts.module.css'
import Post from "../Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/State";

const MyPosts = (props) => {

    let newPostElement = React.createRef()

    return <div className={classes.item}>
        <div>
            create your new post
        </div>
        <div>
            <textarea onChange={() => {
                props.dispatch(updateNewPostTextActionCreator(newPostElement.current.value))
            }} ref={newPostElement} value={props.state.newPostText}/>
        </div>
        <div>
            <button onClick={() => {
                props.dispatch(addPostActionCreator(newPostElement.current.value))
            }}>Add post
            </button>
        </div>
        <div className={classes.posts}>
            {props.state.postData.map(el => <Post text={el.text} likes={el.likes}/>)}
        </div>
    </div>
}

export default MyPosts