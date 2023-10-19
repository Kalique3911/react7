import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {follow, getUsers, setCurrentPage, unfollow,} from '../../redux/usersReducer'
import Users from './Users'
import preloader from '../../images/preloader.gif'
import {compose} from 'redux'
import {withAuthNavigate} from '../../common/HOCs/withAuthNavigate'
import {getUsersSelector} from '../../redux/selectors'

function UsersContainer(props) {

    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize)
    }, [props.currentPage, props.pageSize])

    const onPageChange = (pageNumber) => {
        props.setCurrentPage(pageNumber)
        props.getUsers(pageNumber, props.pageSize)
    }

    return <div>
        <div>
            {props.isFetching ? <img src={preloader} alt={'preloader'}/> : null}
        </div>
        <Users totalUsersCount={props.totalUsersCount}
               pageSize={props.pageSize}
               currentPage={props.currentPage}
               onPageChange={onPageChange}
               usersData={props.usersData}
               follow={props.follow}
               unfollow={props.unfollow}
               followingInProgress={props.followingInProgress}
        />
    </div>
}

const mapStateToProps = (state) => {
    return {
        usersData: getUsersSelector(state),
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export default compose(
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, getUsers}),
    withAuthNavigate
)(UsersContainer)
