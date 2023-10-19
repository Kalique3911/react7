import React from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import {logoutUser} from '../../redux/authReducer'

function HeaderContainer(props) {
    return <Header {...props}/>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    id: state.auth.id,
    small: state.auth.smallPhoto
})

export default connect(mapStateToProps, {logoutUser: logoutUser})(HeaderContainer)