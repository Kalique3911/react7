import {configureStore} from '@reduxjs/toolkit'
import usersSlice from './usersSlice'
import authSlice from './authSlice'
import {profileAPI} from '../API/profileAPI'
import {usersAPI} from '../API/usersAPI'
import {authAPI} from '../API/authAPI'

export default configureStore({
    reducer: {
        usersPage: usersSlice,
        auth: authSlice,
        [profileAPI.reducerPath]: profileAPI.reducer,
        [usersAPI.reducerPath]: usersAPI.reducer,
        [authAPI.reducerPath]: authAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(profileAPI.middleware, usersAPI.middleware, authAPI.middleware)

})
