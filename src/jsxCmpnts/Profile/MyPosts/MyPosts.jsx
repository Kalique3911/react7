import React, {memo} from 'react'
import classes from './MyPosts.module.css'
import Post from '../Post/Post'
import {useDispatch, useSelector} from 'react-redux'
import {compose} from 'redux'
import {setPost} from '../../../redux/profileSlice'
import {getPostData} from '../../../selectors/profileSelectors'
import {useForm} from 'react-hook-form'

const MyPosts = (props) => {
    const dispatch = useDispatch()
    const postData = useSelector((state) => getPostData(state))
    const {register, handleSubmit, formState: {errors}, reset} = useForm({mode: 'onChange'})

    const onSubmit = data => {
        dispatch(setPost(data.post))
        reset()
    }

    return <div className={classes.item}>
        <div>
            create your new post
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('post', {
                required: 'Post require filed',
                maxLength: {value: 16384, message: 'max length is 16384'}
            })} placeholder={'your new post'}
            />
            {errors.post && <div style={{color: 'red'}}>{errors.post.message}</div>}
            <div>
                <button>Send</button>
            </div>
        </form>
        <div className={classes.posts}>
            {postData.map(el => <Post key={el.id} text={el.text} likes={el.likes}/>)}
        </div>
    </div>
}

export default compose(memo)(MyPosts)