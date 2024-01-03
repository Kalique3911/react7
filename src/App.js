import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import News from './jsxCmpnts/News/News'
import Music from './jsxCmpnts/Music/Music'
import Users from './jsxCmpnts/Users/Users'
import Profile from './jsxCmpnts/Profile/Profile'
import Header from './jsxCmpnts/Header/Header'
import LogIn from './jsxCmpnts/LogIn/LogIn'
import {useDispatch, useSelector} from 'react-redux'
import {setAuth, setInit} from './redux/authSlice'
import Navbar from './jsxCmpnts/Navbar/Navbar'
import {useEffect} from 'react'
import {useGetInitQuery} from './API/authAPI'
import Messages from './jsxCmpnts/Messages/Messages'
import './content.css'


export const App = () => {
    const dispatch = useDispatch()
    const isLoggingOut = useSelector(state => state.auth.isLoggingOut)
    const result = useGetInitQuery().data

    useEffect(() => {
        dispatch(setInit(true))
    })

    if (!useSelector(state => state.auth.isInit) || result === undefined || isLoggingOut) {
        return <></>
    }

    if (result === 0) {
        dispatch(setAuth(true))
    }

    return <BrowserRouter>
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className={'content'}>
                <Routes>
                    <Route path="/" element={<News/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/messages" element={<Messages/>}/>
                    <Route path="/profile/:userId" element={<Profile/>}/>
                    <Route path="/music" element={<Music/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/login" element={<LogIn/>}/>
                </Routes>
            </div>
        </div>
    </BrowserRouter>
}