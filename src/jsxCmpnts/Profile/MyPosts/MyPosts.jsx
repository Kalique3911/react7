import React from 'react'
import classes from './MyPosts.module.css'
import Post from '../Post/Post'

const MyPosts = (props) => {

    const newPostElement = React.createRef()

    return <div className={classes.item}>
        <div>
            create your new post
        </div>
        <div>
            <textarea onChange={() => props.updateNewPostText(newPostElement.current.value)} ref={newPostElement}
                      value={props.newPostText}/>
        </div>
        <div>
            <button onClick={() => {
                props.addPost()
            }}>Add post
            </button>
        </div>
        <div className={classes.posts}>
            {props.postData.map(el => <Post key={el.id} text={el.text} likes={el.likes}/>)}
        </div>
    </div>
}

export default MyPosts