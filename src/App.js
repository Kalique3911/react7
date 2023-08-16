import './App.css';
import Header from './cmpnts/Header'
import Navbar from './cmpnts/Navbar'
import Profile from "./cmpnts/Profile";


const App = () => {
    return <div className='app-wrapper'>
        <Header />
        <Navbar />
        <Profile />
    </div>
}

export default App;