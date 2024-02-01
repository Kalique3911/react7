import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import News from './components/News/News'
import Music from './components/Music/Music'
import Profile from './components/Profile/Profile'
import Header from './components/Header/Header'
import LogIn from './components/LogIn/LogIn'
import {useDispatch, useSelector} from 'react-redux'
import {setAuth, setInit} from './redux/authSlice'
import Navbar from './components/Navbar/Navbar'
import {lazy, Suspense, useEffect} from 'react'
import {useGetInitQuery} from './API/authAPI'
import Messages from './components/Messages/Messages'
import './components/Header/Header.css'

export const App = () => {
    const dispatch = useDispatch()
    const isLoggingOut = useSelector(state => state.auth.isLoggingOut)
    const result = useGetInitQuery().data
    const Users = lazy(() => import('./components/Users/Users'))

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
        <Header/>
        <div className="app-wrapper">
            <Navbar/>
            <div className={'content'}>
                <Routes>
                    <Route path="/" element={<Suspense fallback={<div></div>}><Users/></Suspense>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/messages" element={<Messages/>}/>
                    <Route path="/profile/:userId" element={<Profile/>}/>
                    <Route path="/music" element={<Music/>}/>
                    <Route path="/users" element={<Suspense fallback={<div></div>}><Users/></Suspense>}/>
                    <Route path="/login" element={<LogIn/>}/>
                </Routes>
            </div>
        </div>
    </BrowserRouter>
}