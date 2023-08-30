import './App.css';
import Header from './jsxCmpnts/Header/Header'
import Navbar from './jsxCmpnts/Navbar/Navbar'
import Profile from "./jsxCmpnts/Profile/Profile";
import Dialogs from "./jsxCmpnts/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import News from "./jsxCmpnts/News/News";
import Settings from "./jsxCmpnts/Settings/Settings";
import Music from "./jsxCmpnts/Music/Music";
import Messages from "./jsxCmpnts/Messages/Messages"
import state from "./redux/State";

const App = (props) => {
    return <BrowserRouter>
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <Routes>
                <Route path="/" element={<News/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/messages" element={<Dialogs state={props.state}/>}/>
                <Route path={"/messages/dialog/1"} element={<Messages state={props.state.dialogs.dialogsData[0]} addFunction={props.state.dialogs.dialogsData[0].addFunction.bind(state)} updateFunction={props.state.dialogs.dialogsData[0].updateFunction.bind(state)}/>}/>
                <Route path={"/messages/dialog/2"} element={<Messages state={props.state.dialogs.dialogsData[1]}/>}/>
                <Route path={"/messages/dialog/3"} element={<Messages state={props.state.dialogs.dialogsData[2]}/>}/>
                <Route path={"/messages/dialog/4"} element={<Messages state={props.state.dialogs.dialogsData[3]}/>}/>
                <Route path="/profile" element={<Profile state={props.state.profile} dispatch={props.dispatch}/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/music" element={<Music/>}/>
            </Routes>
        </div>
    </BrowserRouter>
}

export default App;