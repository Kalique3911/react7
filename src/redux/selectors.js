import {createSelector} from 'reselect'

export const getUsers = (state) => {
    return state.usersPage.usersData
}

export const getUsersSelector = createSelector(getUsers, (usersData) => {
    return usersData.filter(user => true)
})

export const getProfile = (state) => {
    return state.profilePage.profile
}

export const getStatus = (state) => {
    return state.profilePage.status
}

export const getAuthUserId = (state) => {
    return state.auth.id
}




