import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import News from './jsxCmpnts/News/News'
import Settings from './jsxCmpnts/Settings/Settings'
import Music from './jsxCmpnts/Music/Music'
import Dialogs from './jsxCmpnts/Dialogs/Dialogs'
import Messages from './jsxCmpnts/Messages/Messages'
import Users from './jsxCmpnts/Users/Users'
import Profile from './jsxCmpnts/Profile/Profile'
import Header from './jsxCmpnts/Header/Header'
import Login from './jsxCmpnts/Login/Login'
import {useDispatch, useSelector} from 'react-redux'
import {setAuth, setInit} from './redux/authSlice'
import preloader from './images/preloader.gif'
import Navbar from './jsxCmpnts/Navbar/Navbar'
import {useEffect} from 'react'
import {useGetInitQuery} from './API/authAPI'

export const App = () => {
    const dispatch = useDispatch()

    const result = useGetInitQuery().data

    useEffect(() => {
        dispatch(setInit(true))
        if (result === 0) {
            dispatch(setAuth(true))
        }
    })

    if (!useSelector(state => state.auth.isInit)) {
        return <img src={preloader} alt={'preloader'}/>
    }
    return <BrowserRouter>
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <Routes>
                <Route path="/" element={<News/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/messages" element={<Dialogs/>}/>
                <Route path="/messages/dialog/1" element={<Messages/>}/>
                <Route path="/profile/:userId?" element={<Profile/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/music" element={<Music/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    </BrowserRouter>
}
//todo pieriedielat' API; ostavit' redux tol'ko dlia UI? Vse dannyie brat' chieriez RTK Query?
//todo pieriedielat' formy
