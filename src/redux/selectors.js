import {createSelector} from 'reselect'

export const getUsers = (state) => {
    return state.usersPage.usersData
}

export const getUsersSelector = createSelector(getUsers, (usersData) => {
    return usersData.filter(user => true)
})