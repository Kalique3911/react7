import './App.css';
import Header from './jsxCmpnts/Header/Header'
import Navbar from './jsxCmpnts/Navbar/Navbar'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import News from "./jsxCmpnts/News/News";
import Settings from "./jsxCmpnts/Settings/Settings";
import Music from "./jsxCmpnts/Music/Music";
import DialogsContainer from "./jsxCmpnts/Dialogs/DialogsContainer";
import MessagesContainer from "./jsxCmpnts/Messages/MessagesContainer";
import UsersContainer from "./jsxCmpnts/Users/UsersContainer";
import Profile from "./jsxCmpnts/Profile/Profile";

const App = () => {
    return <BrowserRouter>
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <Routes>
                <Route path="/" element={<News/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/messages" element={<DialogsContainer/>}/>
                <Route path="/messages/dialog/1" element={<MessagesContainer/>}/>
                <Route path="/profile/:userId?" element={<Profile/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/music" element={<Music/>}/>
                <Route path="/users" element={<UsersContainer/>}/>
            </Routes>
        </div>
    </BrowserRouter>
}

export default App;