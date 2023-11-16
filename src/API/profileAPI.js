import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const profileAPI = createApi({
    reducerPath: 'profileAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.0/profile',
        credentials: 'include',
    }),
    endpoints: (build) => ({
        getUserProfile: build.query({
            query: userId => `${userId}`
        }),
        getAuthUserAva: build.query({
            query: userId => `${userId}`,
            transformResponse: responseData => responseData.photos.small
        }),
        getUserStatus: build.query({
            query: (userId) => `status/${userId}`
        }),
        passUserStatus: build.mutation({
            query: (status) => ({url: `status`, method: 'PUT', body: status})
        })
    })
})

export const {useGetUserProfileQuery, useGetUserStatusQuery, usePassUserStatusMutation, useGetAuthUserAvaQuery} = profileAPI