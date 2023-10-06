import React from 'react'
import MyPosts from './MyPosts'
import {addPost} from '../../../redux/profileReducer'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        newPostText: state.profilePage.newPostText,
        postData: state.profilePage.postData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (body) => {
            dispatch(addPost(body))
        },
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer