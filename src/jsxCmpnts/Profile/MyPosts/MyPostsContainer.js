import React from 'react'
import MyPosts from './MyPosts'
import {addPost} from '../../../redux/profileReducer'
import {connect} from 'react-redux'

const MyPostsContainer = (props) => {
    return <MyPosts {...props}/>
}

const mapStateToProps = (state) => {
    return {
        newPostText: state.profilePage.newPostText,
        postData: state.profilePage.postData,
    }
}

export default connect(mapStateToProps, {addPost})(MyPostsContainer)