import {createSlice} from '@reduxjs/toolkit'

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        pageSize: 100,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setToggleIsFollowingProgress: {
            reducer: (state, action) => {
                action.payload.boolean
                    ? state.followingInProgress.push(action.payload.userId)
                    : state.followingInProgress.splice(state.followingInProgress.indexOf(action.payload.userId))
            },
            prepare: (userId, boolean) => {
                return {payload: {userId, boolean}}
            }
        }
    }
})

export default usersSlice.reducer

export const {
    setCurrentPage,
    setToggleIsFollowingProgress
} = usersSlice.actions