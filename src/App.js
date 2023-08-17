import './App.css';
import Header from './jsxCmpnts/Header/Header'
import Navbar from './jsxCmpnts/Navbar/Navbar'
import Profile from "./jsxCmpnts/Profile/Profile";


const App = () => {
    return <div className='app-wrapper'>
        <Header/>
        <Navbar/>
        <Profile/>
    </div>
}

export default App;