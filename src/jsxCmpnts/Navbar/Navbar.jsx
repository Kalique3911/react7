import React, {memo} from 'react'
import classes from './Navbar.module.css'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {compose} from 'redux'

const Navbar = props => {

    const authUserId = useSelector(state => state.auth.id)

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
        <div className={classes.item}>
            <NavLink to='/settings'>Settings</NavLink>
        </div>
    </nav>
}

export default compose(memo)(Navbar)