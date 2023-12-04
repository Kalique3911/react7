import React, {memo} from 'react'
import './Navbar.css'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {compose} from 'redux'
import {useGetAuthUserIdQuery} from '../../API/authAPI'
import {getIsAuth} from '../../selectors/authSelectors'

const Navbar = props => {

    const isAuth = useSelector((state) => getIsAuth(state))
    const {data: authUserId} = useGetAuthUserIdQuery(undefined, {
        refetchOnMountOrArgChange: true,
        skip: !isAuth
    })

    return <nav className={'nav'}>
        <div>
            <NavLink className={'navLink'} to={`/profile/${authUserId}`}>My Page</NavLink>
        </div>
        <div>
            <NavLink className={'navLink'} to="/messages">Messages</NavLink>
        </div>
        <div>
            <NavLink className={'navLink'} to="/news">News</NavLink>
        </div>
        <div>
            <NavLink className={'navLink'} to="/users">Users</NavLink>
        </div>
        <div>
            <NavLink className={'navLink'} to="/music">Music</NavLink>
        </div>
    </nav>
}

export default compose(memo)(Navbar)