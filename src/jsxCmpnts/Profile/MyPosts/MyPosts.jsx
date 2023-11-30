import React, {memo, useState} from 'react'
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
    const {register, handleSubmit, formState: {errors}, reset, watch} = useForm({mode: 'onChange'})
    let [postLength, setPostLength] = useState(0)

    const onSubmit = data => {
        dispatch(setPost(data.post))
        setPostLength(0)
        reset()
    }

    watch((data) => {
        if (data.post) {
            setPostLength(data.post.length)
        }
    })


    return <div className={classes.item}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('post', {
                required: 'Post require filled',
                maxLength: {value: 16384, message: 'max length is 16384'}
            })} placeholder={'your new post'}
            />
            {errors.post && <div style={{color: 'red'}}>{errors.post.message}</div>}
            {16384 - postLength < 200 && <div>{`${16384 - postLength} symbols left`}</div>}
            <div>
                <button>Send</button>
            </div>
        </form>
        <div className={classes.posts}>
            {postData.map(el => <Post smallPhoto={props.smallPhoto} key={el.id} text={el.text} likes={el.likes}/>)}
        </div>
    </div>
}

export default compose(memo)(MyPosts)