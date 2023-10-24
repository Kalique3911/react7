import React from 'react'
import {connect} from 'react-redux'
import ProfileInfo from './ProfileInfo'
import {getUserProfile, setUserStatus, updateUserStatus} from '../../../redux/profileReducer'
import {withAuthNavigate} from '../../../common/HOCs/withAuthNavigate'
import {compose} from 'redux'
import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {getAuthUserId, getProfile, getStatus} from '../../../redux/selectors'

function ProfileInfoContainer(props) {
    //  beriom userId iz URL s pomosch'ju useParams
    let {userId} = useParams()

    useEffect(() => {
        if (!userId) {
            userId = props.authUserId
        }

        props.getUserProfile(userId)
        props.setUserStatus(userId)
    }, [props.authUserId, userId])

    return <ProfileInfo {...props} status={props.status} updateUserStatus={props.updateUserStatus}
                        userId={userId} authUserId={props.authUserId}
    />
}

const mapStateToProps = (state) => {
    return {
        // profile: getProfile(state),
        status: getStatus(state),
        authUserId: getAuthUserId(state),
    }
}

export default compose(connect(mapStateToProps, {getUserProfile, setUserStatus, updateUserStatus}),
    withAuthNavigate
)(ProfileInfoContainer)