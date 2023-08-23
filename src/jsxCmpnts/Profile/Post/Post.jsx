import React from 'react'
import classes from './Post.module.css'

const Post = (props) => {
    return <div className={classes.item}>
        <div>
            <div>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/1/14/Eugene_Ferdinand_Victor_Delacroix_Attila_fragment.jpg'/>
                {props.text}
            </div>
            <div>
                {props.likes}
                <span>like</span>
            </div>
        </div>
    </div>
}

export default Post