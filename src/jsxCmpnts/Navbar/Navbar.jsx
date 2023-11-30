import React, {memo} from 'react'
import classes from './Navbar.module.css'
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

    return <nav className={classes.nav}>
        <div className={classes.item}>
            <NavLink to={`/profile/${authUserId}`}>My Page</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/messages'>Messages</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/news'>News</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/users'>Users</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/music'>Music</NavLink>
        </div>
    </nav>
}

export default compose(memo)(Navbar)