import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const profileAPI = createApi({
    reducerPath: 'profileAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://social-network.samuraijs.com/api/1.0/profile'}),
    endpoints(build) {
        return {
            getUserProfile: build.query({
                query(arg) {
                    return `${arg}`
                }
            }),
            getUserStatus: build.query({
                query(arg) {
                    return `status/${arg}`
                }
            }),





        }
    }
})

window.profileAPI = profileAPI

export const {useGetUserProfileQuery, useGetUserStatusQuery} = profileAPI