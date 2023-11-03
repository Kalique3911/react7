import React, {memo} from 'react'
import classes from './Header.module.css'
import logo from '../../images/logo.jpg'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getIsAuth, getLogin, getSmallPhoto} from '../../selectors/authSelectors'
import {logoutUser} from '../../redux/authSlice'
import {compose} from 'redux'

const Header = props => {

    const dispatch = useDispatch()

    const isAuth = useSelector((state) => getIsAuth(state))
    const login = useSelector((state) => getLogin(state))
    const smallPhoto = useSelector((state) => getSmallPhoto(state))

    return <header className={classes.header}>
        <img src={logo} alt={'logo'}/>
        <div className={classes.loginBlock}>
            {isAuth
                ? <div>
                    <div>{login}</div>
                    <span onDoubleClick={() => dispatch(logoutUser())}>Logout</span>
                </div>
                : <NavLink to={'/login'}>Login</NavLink>}
            <img src={smallPhoto} alt={'small photo'}/>
        </div>
    </header>
}

export default compose(memo)(Header)