import dialogsReducer from './dialogsReducer'
import usersReducer from './usersReducer'
import authReducer from './authReducer'
import profileSlice from './profileSlice'
import {reducer as formReducer} from 'redux-form'
import {configureStore} from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
            profilePage: profileSlice,
            dialogsPage: dialogsReducer,
            usersPage: usersReducer,
            auth: authReducer,
            form: formReducer
        }
})
