import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '12a5bbef-9278-4dc2-ba7a-83b6c77a8a9b'
    }
})

export const getUsers = (currentPage = 1, pageSize = 10) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
}

export const unfollow = (id) => {
    return instance.delete(`follow/${id}`).then(response => response.data)
}

export const follow = (id) => {
    return instance.post(`follow/${id}`, {}).then(response => response.data)
}

export const getUserData = () => {
    return instance.get(`auth/me`).then(response => response.data)
}

export const getUserProfile  = (userId) => {
    return instance.get(`profile/${userId}`).then(response => response.data)
}

export const getAuthUserAva  = (userId) => {
    return instance.get(`profile/${userId}`).then(response => response.data.photos.small)
}