import React, {memo} from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {compose} from 'redux'
import {useGetAuthUserIdQuery} from '../../API/authAPI'
import {getIsAuth} from '../../selectors/authSelectors'
import profile from '../../images/profile.png'
import users from '../../images/users.png'
import messages from '../../images/messages.png'
import news from '../../images/news.png'
import music from '../../images/music.png'

const Navbar = () => {

    const isAuth = useSelector((state) => getIsAuth(state))
    const {data: authUserId} = useGetAuthUserIdQuery(undefined, {
        refetchOnMountOrArgChange: true,
        skip: !isAuth
    })

    return <nav className={'nav'}>
        <div>
            <img src={profile} alt={'profile'} className={'icon'}/>
            <Link className={'link'} to={`/profile/${authUserId}`}>My Page</Link>
        </div>
        <div>
            <img src={messages} alt={'messages'} className={'icon'}/>
            <Link className={'link'} to="/messages">Messages</Link>
        </div>
        <div>
            <img src={users} alt={'users'} className={'icon'}/>
            <Link className={'link'} to="/users">Users</Link>
        </div>
        <div>
            <img src={news} alt={'news'} className={'icon'}/>
            <Link className={'link'} to="/news">News</Link>
        </div>
        <div>
            <img src={music} alt={'music'} className={'icon'}/>
            <Link className={'link'} to="/music">Music</Link>
        </div>
    </nav>
}

export default compose(memo)(Navbar)