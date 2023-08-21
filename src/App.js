import './App.css';
import Header from './jsxCmpnts/Header/Header'
import Navbar from './jsxCmpnts/Navbar/Navbar'
import Profile from "./jsxCmpnts/Profile/Profile";
import Dialogs from "./jsxCmpnts/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import News from "./jsxCmpnts/News/News";
import Settings from "./jsxCmpnts/Settings/Settings";
import Music from "./jsxCmpnts/Music/Music";

const App = () => {
    return <BrowserRouter>
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <Routes>
                <Route path="/" element={<News/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/messages" element={<Dialogs/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/music" element={<Music/>}/>
            </Routes>
        </div>
    </BrowserRouter>
}

export default App;