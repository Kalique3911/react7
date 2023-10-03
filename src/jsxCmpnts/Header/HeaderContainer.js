import React from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import {getUserData} from '../../redux/authReducer'

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getUsersData()
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.data.login,
    id: state.auth.data.id,
    small: state.auth.smallPhoto
})

export default connect(mapStateToProps, {getUsersData: getUserData})(HeaderContainer)