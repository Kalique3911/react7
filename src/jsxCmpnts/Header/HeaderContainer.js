import React from 'react'
import Header from './Header';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAuthUserData, setAuthUserPhoto} from '../../redux/authReducer';
import {getAuthUserAva, getUserData} from '../../API/API';

class HeaderContainer extends React.Component {
    componentDidMount() {
        getUserData().then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data
                    this.props.setAuthUserData(id, email, login)
                    getAuthUserAva(data.data.id).then(small => {
                        this.props.setAuthUserPhoto(small)
                    })
                }
            })
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

export default connect(mapStateToProps, {setAuthUserData, setAuthUserPhoto})(HeaderContainer)