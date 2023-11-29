import React, {memo} from 'react'
import classes from './Post.module.css'
import defaultAva from '../../../images/defaultAva.jpg'
import {compose} from 'redux'

const Post = (props) => {
    return <div className={classes.item}>
        <div>
            <div>
                <img src={props.smallPhoto ? props.smallPhoto : defaultAva} alt={'ava'}/>
                {props.text}
            </div>
            <button>
                {`${props.likes} like`}
            </button>
        </div>
    </div>
}

export default compose(memo)(Post)