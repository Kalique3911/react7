import {createSlice} from '@reduxjs/toolkit'
import {checkFollow, fetchUsers, insertFollow, insertUnfollow} from '../API/API'

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersData: [],
        pageSize: 100,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
    },
    reducers: {
        setUnfollow: {
            reducer: (state, action) => {
                state.usersData.map(user => {
                    if (user.id === action.payload.userId) {
                        user.followed = action.payload.boolean
                    }
                })
            },
            prepare: (boolean, userId) => {
                return {payload: {boolean, userId}}
            }
        },
        setFollow: {
            reducer: (state, action) => {
                state.usersData.map(user => {
                    if (user.id === action.payload.userId) {
                        user.followed = action.payload.boolean
                    }
                })
            },
            prepare: (boolean, userId) => {
                return {payload: {boolean, userId}}
            }
        },
        setUsers: (state, action) => {
            state.usersData = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setTotalUsersCount: (state, action) => {
            state.totalUsersCount = action.payload
        },
        setToggleIsFetching: (state, action) => {
            state.isFetching = action.payload
        },
        setToggleIsFollowingProgress: {
            reducer: (state, action) => {
                action.payload.isFetching
                    ? state.followingInProgress.push(action.payload.userId)
                    : state.followingInProgress = state.followingInProgress.filter(id => id !== action.payload.userId)
            },
            prepare: (isFetching, userId) => {
                return {payload: {isFetching, userId}}
            }
        }
    }
})

export const getUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(setToggleIsFetching(true))

        fetchUsers(currentPage, pageSize).then(data => {
            dispatch(setToggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })
    }
}
export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(setToggleIsFollowingProgress(true, userId))
        insertUnfollow(userId).then(data => {
            if (data.resultCode === 0) {
                checkFollow(userId).then(data => dispatch(setUnfollow(data, userId)))
            }
            dispatch(setToggleIsFollowingProgress(false, userId))
        })
    }
}
export const follow = (userId) => {
    return (dispatch) => {
        dispatch(setToggleIsFollowingProgress(true, userId))
        insertFollow(userId).then(data => {
            if (data.resultCode === 0) {
                checkFollow(userId).then(data => dispatch(setFollow(data, userId)))
            }

            dispatch(setToggleIsFollowingProgress(false, userId))
        })
    }
}

export default usersSlice.reducer

export const {
    setUnfollow,
    setFollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    setToggleIsFetching,
    setToggleIsFollowingProgress
} = usersSlice.actions