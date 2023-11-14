import React, {memo} from 'react'
import classes from './Header.module.css'
import logo from '../../images/logo.jpg'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getIsAuth} from '../../selectors/authSelectors'
import {logoutUser} from '../../redux/authSlice'
import {compose} from 'redux'
import {useGetAuthUserIdQuery, useGetAuthUserLoginQuery} from '../../API/authAPI'
import {useGetAuthUserAvaQuery} from '../../API/profileAPI'
import defaultAva from '../../images/defaultAva.jpg'

const Header = props => {
    const dispatch = useDispatch()

    const isAuth = useSelector((state) => getIsAuth(state))
    const login = useGetAuthUserLoginQuery().data
    const authUserId = useGetAuthUserIdQuery().data
    const smallPhoto = useGetAuthUserAvaQuery(authUserId).data

    return <header className={classes.header}>
        <img src={logo} alt={'logo'}/>
        <div className={classes.loginBlock}>
            {isAuth
                ? <div>
                    <div>{login}</div>
                    <span onDoubleClick={() => dispatch(logoutUser())}>Logout</span>
                </div>
                : <NavLink to={'/login'}>Login</NavLink>}
            <img src={smallPhoto ? smallPhoto : defaultAva} alt={'small photo'}/>
        </div>
    </header>
}

export default compose(memo)(Header)