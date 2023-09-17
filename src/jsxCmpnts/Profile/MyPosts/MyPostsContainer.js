import React from 'react'
import MyPosts from "./MyPosts";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer"
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        newPostText: state.profile.newPostText,
        postData: state.profile.postData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (body) => {
            dispatch(addPostActionCreator(body))
        },
        updateNewPostText: (body) => {
            dispatch(updateNewPostTextActionCreator(body))
        }
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer