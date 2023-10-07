import React from 'react'
import classes from './Header.module.css'
import logo from '../../images/logo.jpg'
import {NavLink} from 'react-router-dom'

const Header = (props) => {
    return <header className={classes.header}>
        <img src={logo} alt={'logo'}/>
        <div className={classes.loginBlock}>
            {props.isAuth
                ? <div>
                    <div>{props.login}</div>
                    <span onDoubleClick={props.logoutUser}>Logout</span>
            </div>
                : <NavLink to={'/login'}>Login</NavLink>}
            <img src={props.smallPhoto} alt={'small photo'}/>
        </div>
    </header>
}

export default Header