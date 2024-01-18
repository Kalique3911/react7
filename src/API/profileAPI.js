import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const profileAPI = createApi({
    reducerPath: 'profileAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.0/profile',
        credentials: 'include',
        prepareHeaders: (headers, {getState}) => {
            headers.set('API-KEY', '12a5bbef-9278-4dc2-ba7a-83b6c77a8a9b')
            return headers
        },
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
        }),
        passUserProfile: build.mutation({
            query: (profile) => ({method: 'PUT', body: profile})
        }),
        passUserPhoto: build.mutation({
            query: (photo) => ({url: '/photo',method: 'PUT', body: photo})
        })
    })
})

export const {useLazyGetUserProfileQuery, useGetUserProfileQuery, useGetUserStatusQuery,
    usePassUserStatusMutation, useGetAuthUserAvaQuery, useLazyGetUserStatusQuery,
    usePassUserProfileMutation, usePassUserPhotoMutation} = profileAPI