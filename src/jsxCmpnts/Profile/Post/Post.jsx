import React, {memo} from 'react'
import classes from './Post.module.css'
import attila from '../../../images/attila.jpg'
import {compose} from 'redux'

const Post = (props) => {
    console.log('render post')
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

export default compose(memo)(Post)