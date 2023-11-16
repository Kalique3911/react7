import React, {memo} from 'react'
import classes from './Header.module.css'
import logo from '../../images/logo.jpg'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getIsAuth} from '../../selectors/authSelectors'
import {setAuth} from '../../redux/authSlice'
import {compose} from 'redux'
import {useGetAuthUserIdQuery, useGetAuthUserLoginQuery, useLogoutMutation} from '../../API/authAPI'
import {useGetAuthUserAvaQuery} from '../../API/profileAPI'
import defaultAva from '../../images/defaultAva.jpg'

const Header = props => {
    const dispatch = useDispatch()

    const isAuth = useSelector((state) => getIsAuth(state))
    const {data: login} = useGetAuthUserLoginQuery(undefined, {
        refetchOnMountOrArgChange: true,
        skip: !isAuth
    })
    const {data: authUserId} = useGetAuthUserIdQuery(undefined, {
        refetchOnMountOrArgChange: true,
        skip: !isAuth
    })
    const {data: smallPhoto} = useGetAuthUserAvaQuery(authUserId, {
        skip: !authUserId
    })
    const [logoutUser] = useLogoutMutation()

    return <header className={classes.header}>
        <img src={logo} alt={'logo'}/>
        <div className={classes.loginBlock}>
            {isAuth
                ? <div>
                    <div>{login}</div>
                    <span onDoubleClick={async () => {
                        await logoutUser()
                        dispatch(setAuth(false))
                    }}>Logout</span>
                    <img src={smallPhoto ? smallPhoto : defaultAva} alt={'small photo'}/>
                </div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default compose(memo)(Header)