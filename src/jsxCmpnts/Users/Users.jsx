import classes from './Users.module.css'
import defaultAva from '../../images/defaultAva.jpg'
import React, {memo} from 'react'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSelector
} from '../../selectors/usersSelectors'
import {follow, getUsers, setCurrentPage, unfollow} from '../../redux/usersReducer'
import {useEffect} from 'react'
import preloader from '../../images/preloader.gif'
import {withAuthNavigate} from '../../common/HOCs/withAuthNavigate'
import {compose} from 'redux'

const Users = props => {
    const dispatch = useDispatch()

    const usersData = useSelector((state) => getUsersSelector(state))
    const pageSize = useSelector((state) => getPageSize(state))
    const totalUsersCount = useSelector((state) => getTotalUsersCount(state))
    const currentPage = useSelector((state) => getCurrentPage(state))
    const isFetching = useSelector((state) => getIsFetching(state))
    const followingInProgress = useSelector((state) => getFollowingInProgress(state))

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize))
    }, [currentPage, pageSize])

    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const onPageChange = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber))
        dispatch(getUsers(pageNumber, pageSize))
    }

    return <div className={classes.user}>
        <div>
            {isFetching ? <img src={preloader} alt={'preloader'}/> : null}
        </div>
        <div className={classes.page}>
            {pages.map(p => {
                return <span className={currentPage === p ? classes.selectedPage : ''} key={p}
                             onClick={() => onPageChange(p)}>{p}</span>
            })}
        </div>
        {usersData.map(user => <div key={user.id}>

                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : defaultAva} alt={'small photo'}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed ? <button
                                disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    dispatch(unfollow(user.id))
                                }}
                            >Unfollow</button>

                            : <button
                                disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    dispatch(follow(user.id))
                                }}
                            >Follow</button>}
                    </div>
                </span>
            <span>
                <div>{user.name}</div><div>{user.status}</div>
            </span>

        </div>)}
    </div>
}

export default compose(withAuthNavigate, memo)(Users)