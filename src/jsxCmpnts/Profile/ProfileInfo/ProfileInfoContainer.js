import React from 'react'
import axios from "axios";
import {connect} from 'react-redux';
import {setUserProfile} from '../../../redux/profileReducer';
import ProfileInfo from './ProfileInfo'
import withRouter from '../../../common/functions/withRouter'

class ProfileInfoContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.router.params.userId
        if (!userId) {
            userId = 30001
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
            return <ProfileInfo {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileInfoContainer))