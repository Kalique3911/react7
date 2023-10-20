import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import News from './jsxCmpnts/News/News'
import Settings from './jsxCmpnts/Settings/Settings'
import Music from './jsxCmpnts/Music/Music'
import DialogsContainer from './jsxCmpnts/Dialogs/DialogsContainer'
import MessagesContainer from './jsxCmpnts/Messages/MessagesContainer'
import UsersContainer from './jsxCmpnts/Users/UsersContainer'
import Profile from './jsxCmpnts/Profile/Profile'
import HeaderContainer from './jsxCmpnts/Header/HeaderContainer'
import LoginContainer from './jsxCmpnts/Login/LoginContainer'
import {connect} from 'react-redux'
import {getUserData} from './redux/authReducer'
import preloader from './images/preloader.gif'
import NavbarContainer from './jsxCmpnts/Navbar/NavbarContainer'
import {useEffect} from 'react'

function App(props) {

    useEffect(() => {
        props.getUsersData()
    })

    if (!props.isInitialized) {
        return <img src={preloader} alt={'preloader'}/>
    }
    return <BrowserRouter>
        <div className="app-wrapper">
            <HeaderContainer/>
            <NavbarContainer/>
            <Routes>
                <Route path="/" element={<News/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/messages" element={<DialogsContainer/>}/>
                <Route path="/messages/dialog/1" element={<MessagesContainer/>}/>
                <Route path="/profile/:userId?" element={<Profile/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/music" element={<Music/>}/>
                <Route path="/users" element={<UsersContainer/>}/>
                <Route path="/login" element={<LoginContainer/>}/>
            </Routes>
        </div>
    </BrowserRouter>
}

const mapStateToProps = (state) => ({
    isInitialized: state.auth.isInitialized,
})

export default connect(mapStateToProps, {getUsersData: getUserData})(App)

//todo dobavit' k funkcijam memo
//todo peredelat' connect na useSelector i useDispatch huki