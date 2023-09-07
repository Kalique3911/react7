import {combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";

let reducers = combineReducers(
    {
        profile: profileReducer,
        dialogs: dialogsReducer,
        users: usersReducer,
    }
)

let store = createStore(reducers)

window.store = store

export default store