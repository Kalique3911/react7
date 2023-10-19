import React from 'react'
import {connect} from 'react-redux'
import {loginUser} from '../../redux/authReducer'
import Login from './Login'

function LoginContainer(props) {
    return <Login {...props}/>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})


export default connect(mapStateToProps, {loginUser: loginUser})(LoginContainer)