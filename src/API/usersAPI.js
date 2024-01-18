import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.0/',
        credentials: 'include',
        prepareHeaders: (headers, {getState}) => {
            headers.set('API-KEY', '1ec0d006-d77f-416c-8e64-8914581958db')
            return headers
        },
    }),
    endpoints: (build) => ({
        getUsers: build.query({
            query: ({currentPage, pageSize}) =>
                `users?page=${currentPage}&count=${pageSize}`
        }),
        follow: build.mutation({
            query: (id) =>
                ({url: `follow/${id}`, method: 'POST'})
        }),
        unfollow: build.mutation({
            query: (id) =>
                ({url: `follow/${id}`, method: 'DELETE'})
        }),
    })
})

export const {useGetUsersQuery, useFollowMutation, useUnfollowMutation} = usersAPI