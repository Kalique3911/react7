import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import News from './jsxCmpnts/News/News'
import Settings from './jsxCmpnts/Settings/Settings'
import Music from './jsxCmpnts/Music/Music'
import Dialogs from './jsxCmpnts/Dialogs/Dialogs'
import Messages from './jsxCmpnts/Messages/Messages'
import UsersContainer from './jsxCmpnts/Users/UsersContainer'
import Profile from './jsxCmpnts/Profile/Profile'
import HeaderContainer from './jsxCmpnts/Header/HeaderContainer'
import LoginContainer from './jsxCmpnts/Login/LoginContainer'
import {useDispatch, useSelector} from 'react-redux'
import {getUserData} from './redux/authReducer'
import preloader from './images/preloader.gif'
import NavbarContainer from './jsxCmpnts/Navbar/NavbarContainer'
import {useEffect} from 'react'

export const App = props => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserData())
    })

    if (!useSelector(state => state.auth.isInitialized)) {
        return <img src={preloader} alt={'preloader'}/>
    }
    return <BrowserRouter>
        <div className="app-wrapper">
            <HeaderContainer/>
            <NavbarContainer/>
            <Routes>
                <Route path="/" element={<News/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/messages" element={<Dialogs/>}/>
                <Route path="/messages/dialog/1" element={<Messages/>}/>
                <Route path="/profile/:userId?" element={<Profile/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/music" element={<Music/>}/>
                <Route path="/users" element={<UsersContainer/>}/>
                <Route path="/login" element={<LoginContainer/>}/>
            </Routes>
        </div>
    </BrowserRouter>
}

//todo dobavit' k funkcijam memo
//todo peredelat' connect na useSelector i useDispatch huki i izbavit'sia ot kontejnernyh komponent