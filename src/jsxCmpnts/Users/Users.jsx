import classes from './Users.module.css'
import defaultAva from '../../images/defaultAva.jpg'
import React, {memo} from 'react'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getCurrentPage, getFollowingInProgress, getPageSize} from '../../selectors/usersSelectors'
import {setCurrentPage, setToggleIsFollowingProgress} from '../../redux/usersSlice'
import preloader from '../../images/preloader.gif'
import {withAuthNavigate} from '../../common/HOCs/withAuthNavigate'
import {compose} from 'redux'
import {useFollowMutation, useGetUsersQuery, useUnfollowMutation} from '../../API/usersAPI'

const Users = props => {
    const dispatch = useDispatch()
    const pageSize = useSelector((state) => getPageSize(state))
    const currentPage = useSelector((state) => getCurrentPage(state))
    const followingInProgress = useSelector((state) => getFollowingInProgress(state))
    const {data: usersData, refetch, isLoading} = useGetUsersQuery({currentPage, pageSize})
    const [follow] = useFollowMutation()
    const [unfollow] = useUnfollowMutation()
    let pages = []

    if (usersData) {
        let totalUsersCount = usersData.totalCount
        let pagesCount = Math.ceil(totalUsersCount / pageSize)
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    }

    const onPageChange = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber))
    }

    if (isLoading) {
        return <img src={preloader} alt={'preloader'}/>
    }

    return <div className={classes.users}>
        <div className={classes.page}>
            {pages.map(p => {
                return <span className={currentPage === p ? classes.selectedPage : ''} key={p}
                             onClick={() => onPageChange(p)}>{p}</span>
            })}
        </div>
        {usersData.items.map(user => {
            return <div key={user.id} className={classes.user}>

                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : defaultAva} alt={'small photo'}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed ? <button
                                disabled={followingInProgress.some(id => id === user.id)}
                                onClick={async () => {
                                    dispatch(setToggleIsFollowingProgress(user.id, true))
                                    await unfollow(user.id)
                                    await refetch()
                                    dispatch(setToggleIsFollowingProgress(user.id, false))
                                }}
                            >Unfollow</button>

                            : <button
                                disabled={followingInProgress.some(id => id === user.id)}
                                onClick={async () => {
                                    dispatch(setToggleIsFollowingProgress(user.id, true))
                                    await follow(user.id)
                                    await refetch()
                                    dispatch(setToggleIsFollowingProgress(user.id, false))
                                }}
                            >Follow</button>}
                    </div>
                </span>
                <span>
                <div>{user.name}</div><div>{user.status}</div>
            </span>
            </div>
        })}
    </div>
}

export default compose(withAuthNavigate, memo)(Users)
