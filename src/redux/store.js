import dialogsReducer from './dialogsReducer'
import authReducer from './authReducer'
import profileSlice from './profileSlice'
import {reducer as formReducer} from 'redux-form'
import {configureStore} from '@reduxjs/toolkit'
import usersSlice from './usersSlice'

export default configureStore({
    reducer: {
            profilePage: profileSlice,
            dialogsPage: dialogsReducer,
            usersPage: usersSlice,
            auth: authReducer,
            form: formReducer
        }
})
