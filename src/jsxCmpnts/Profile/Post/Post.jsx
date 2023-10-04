import React from 'react'
import classes from './Post.module.css'
import attila from '../../../images/attila.jpg'

const Post = (props) => {
    return <div className={classes.item}>
        <div>
            <div>
                <img src={attila} alt={'ava'}/>
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