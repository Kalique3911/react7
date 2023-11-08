import dialogsReducer from './dialogsSlice'
import profileSlice from './profileSlice'
import {reducer as formReducer} from 'redux-form'
import {configureStore} from '@reduxjs/toolkit'
import usersSlice from './usersSlice'
import authSlice from './authSlice'
import {profileAPI} from '../API/profileAPI'

export default configureStore({
    reducer: {
        profilePage: profileSlice,
        dialogsPage: dialogsReducer,
        usersPage: usersSlice,
        auth: authSlice,
        [profileAPI.reducerPath]: profileAPI.reducer,
        form: formReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(profileAPI.middleware)

})
