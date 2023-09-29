import React from "react"
import {connect} from "react-redux"
import {
    follow, followUser, getUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow, unfollowUser
} from '../../redux/usersReducer'
import Users from "./Users"
import preloader from "../../images/preloader.gif"

class UsersAPI extends React.Component {
    componentDidMount() {

        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChange = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <div>
            <div>{this.props.isFetching ?
                <img src={preloader}/> : null}
            </div>
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChange={this.onPageChange}
                   usersData={this.props.usersData}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   toggleFollowingProgress={this.props.toggleFollowingProgress}
                   followingInProgress={this.props.followingInProgress}
            />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

const UsersContainer = connect(mapStateToProps,
    {
        follow, unfollow, setCurrentPage,
        getUsers, toggleFollowingProgress
    })(UsersAPI)

export default UsersContainer