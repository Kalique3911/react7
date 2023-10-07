import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '12a5bbef-9278-4dc2-ba7a-83b6c77a8a9b'
    }
})

export const getUsersAPI = (currentPage = 1, pageSize = 10) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
}

export const unfollowAPI = (id) => {
    return instance.delete(`follow/${id}`).then(response => response.data)
}

export const followAPI = (id) => {
    return instance.post(`follow/${id}`).then(response => response.data)
}

export const getUserDataAPI = () => {
    return instance.get(`auth/me`).then(response => response.data)
}

export const getUserProfileAPI = (userId) => {
    return instance.get(`profile/${userId}`).then(response => response.data)
}

export const getAuthUserAvaAPI = (userId) => {
    return instance.get(`profile/${userId}`).then(response => response.data.photos.small)
}

export const getUserStatusAPI = (userId) => {
    return instance.get(`profile/status/${userId}`)
}

export const updateUserStatusAPI = (status) => {
    return instance.put(`profile/status`, {status: status})
}

export const loginAPI = (email, password, rememberMe) => {
    return instance.post(`/auth/login`, {email, password, rememberMe})
}

export const logoutAPI = () => {
    return instance.delete(`/auth/login`)
}

