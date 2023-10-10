import React from 'react'
import {connect} from 'react-redux'
import ProfileInfo from './ProfileInfo'
import withRouter from '../../../common/functions/withRouter'
import {getUserProfile, setUserStatus, updateUserStatus} from '../../../redux/profileReducer'
import {withAuthNavigate} from '../../../common/HOCs/withAuthNavigate'
import {compose} from 'redux'

class ProfileInfoContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.router.params.userId // beriom userId iz URL s pomosch'ju withRouter
        if (!userId) {
            userId = this.props.userId
        }
        this.props.getUserProfile(userId)
        this.props.setUserStatus(userId)
    }

    render() {
        return <ProfileInfo {...this.props} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile, status: state.profilePage.status,
    userId: state.auth.id
})

export default compose(connect(mapStateToProps, {
        getUserProfile, setUserStatus, updateUserStatus
    }), withRouter, withAuthNavigate
)(ProfileInfoContainer)