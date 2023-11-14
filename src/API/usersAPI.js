import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.0/',
        credentials: 'include'
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

export const {useGetUsersQuery, useFollowMutation, useUnfollowMutation, useCheckFollowQuery} = usersAPI