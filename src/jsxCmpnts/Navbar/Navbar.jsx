import React, {memo} from 'react'
import './Navbar.css'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {compose} from 'redux'
import {useGetAuthUserIdQuery} from '../../API/authAPI'
import {getIsAuth} from '../../selectors/authSelectors'
import profile from '../../images/profile.png'
import users from '../../images/users.png'
import messages from '../../images/messages.png'
import news from '../../images/news.png'
import music from '../../images/music.png'

const Navbar = props => {

    const isAuth = useSelector((state) => getIsAuth(state))
    const {data: authUserId} = useGetAuthUserIdQuery(undefined, {
        refetchOnMountOrArgChange: true,
        skip: !isAuth
    })

    return <nav className={'nav'}>
        <div>
            <img src={profile} alt={'profile'} className={'icon'}/>
            <NavLink className={'navLink'} to={`/profile/${authUserId}`}>My Page</NavLink>
        </div>
        <div>
            <img src={messages} alt={'messages'} className={'icon'}/>
            <NavLink className={'navLink'} to="/messages">Messages</NavLink>
        </div>
        <div>
            <img src={news} alt={'news'} className={'icon'}/>
            <NavLink className={'navLink'} to="/news">News</NavLink>
        </div>
        <div>
            <img src={users} alt={'users'} className={'icon'}/>
            <NavLink className={'navLink'} to="/users">Users</NavLink>
        </div>
        <div>
            <img src={music} alt={'music'} className={'icon'}/>
            <NavLink className={'navLink'} to="/music">Music</NavLink>
        </div>
    </nav>
}

export default compose(memo)(Navbar)