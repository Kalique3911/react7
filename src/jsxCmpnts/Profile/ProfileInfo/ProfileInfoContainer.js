import React from 'react'
import {connect} from 'react-redux'
import ProfileInfo from './ProfileInfo'
import withRouter from '../../../common/functions/withRouter'
import {getUserProfile} from '../../../redux/profileReducer'
import {withAuthNavigate} from '../../../common/HOCs/withAuthNavigate';

class ProfileInfoContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.router.params.userId
        if (!userId) {
            userId = 30001
        }
        this.props.getUserProfile(userId)
    }

    render() {
        return <ProfileInfo {...this.props}/>
    }
}

let AuthNavigateComponent = withAuthNavigate(ProfileInfoContainer)

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {getUserProfile})(withRouter(AuthNavigateComponent))