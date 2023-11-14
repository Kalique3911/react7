export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}
