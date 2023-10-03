import React from 'react'
import Dialogs from './Dialogs'
import {connect} from 'react-redux'
import {withAuthNavigate} from '../../common/HOCs/withAuthNavigate'
import {compose} from 'redux'

class DialogsContainer extends React.Component {
    render() {
        return <Dialogs {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        usersData: state.dialogsPage.usersData, isAuth: state.auth.isAuth,
    }
}

export default compose(connect(mapStateToProps), withAuthNavigate)(DialogsContainer)
