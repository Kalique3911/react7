import React, {memo} from 'react'
import classes from './MyPosts.module.css'
import Post from '../Post/Post'
import {Field, reduxForm} from 'redux-form'
import {requireField, maxLengthCreator} from '../../../common/functions/validators'
import {Textarea} from '../../../common/FormsControls/FormsControls'
import {useDispatch, useSelector} from 'react-redux'
import {addPost} from '../../../redux/profileReducer'
import {compose} from 'redux'

const MyPostsForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'your new post'} name={'myPost'} component={Textarea}
                   validate={[requireField, maxLengthCreator(16384)]}/>
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

const MyPostsReduxForm = reduxForm({form: 'myPosts'})(MyPostsForm)

const MyPosts = (props) => {
    const dispatch = useDispatch()
    const postData = useSelector((state) => state.profilePage.postData)

    const onSubmit = (formData) => {
        console.log(formData)
        dispatch(addPost(formData.myPost))
        formData.myPost = ''
    }

    return <div className={classes.item}>
        <div>
            create your new post
        </div>
        <MyPostsReduxForm onSubmit={onSubmit}/>
        <div className={classes.posts}>
            {postData.map(el => <Post key={el.id} text={el.text} likes={el.likes}/>)}
        </div>
    </div>
}

export default compose(memo)(MyPosts)