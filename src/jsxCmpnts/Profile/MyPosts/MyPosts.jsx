import React from 'react'
import classes from './MyPosts.module.css'
import Post from '../Post/Post'
import {Field, reduxForm} from 'redux-form'
import {requireField, maxLengthCreator} from '../../../common/functions/validators'
import {Textarea} from '../../../common/FormsControls/FormsControls'

const MyPostsForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'your new post'} name={'myPost'} component={Textarea}
                   validate={[requireField, maxLengthCreator(30)]}/>
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

const MyPostsReduxForm = reduxForm({form: 'myPosts'})(MyPostsForm)

const MyPosts = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
        props.addPost(formData.myPost)
        formData.myPost = ''
    }

    return <div className={classes.item}>
        <div>
            create your new post
        </div>
        <MyPostsReduxForm onSubmit={onSubmit}/>
        <div className={classes.posts}>
            {props.postData.map(el => <Post key={el.id} text={el.text} likes={el.likes}/>)}
        </div>
    </div>
}

export default MyPosts