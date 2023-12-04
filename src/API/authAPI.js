import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.0/auth',
        credentials: 'include',
    }),
    endpoints: (build) => ({
        getAuthUserLogin: build.query({
            query: () => `/me`,
            transformResponse: responseData => responseData.data.login
        }),
        getAuthUserEmail: build.query({
            query: () => `/me`,
            transformResponse: responseData => responseData.data.email
        }),
        getAuthUserId: build.query({
            query: () => `/me`,
            transformResponse: responseData => responseData.data.id
        }),
        getInit: build.query({
            query: () => `/me`,
            transformResponse: responseData => responseData.resultCode
        }),
        login: build.mutation({
            query: ({email, password, rememberMe}) => ({
                url: `/login`,
                method: 'POST',
                body: {email, password, rememberMe}
            })
        }),
        logout: build.mutation({
            query: () => ({
                url: `/login`,
                method: 'DELETE',
            })
        })
    })
})

export const {
    useGetAuthUserIdQuery, useGetInitQuery, useGetAuthUserLoginQuery,
    useLoginMutation, useLogoutMutation, useGetAuthUserEmailQuery
} = authAPI