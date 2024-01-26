import React, {memo, useState} from 'react'
import './Header.css'
import logo from '../../images/logo.png'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getIsAuth} from '../../selectors/authSelectors'
import {setAuth, setIsLoggingOut} from '../../redux/authSlice'
import {compose} from 'redux'
import {
    useGetAuthUserEmailQuery, useGetAuthUserIdQuery, useGetAuthUserLoginQuery, useLogoutMutation
} from '../../API/authAPI'
import {useGetAuthUserAvaQuery} from '../../API/profileAPI'
import defaultAva from '../../images/defaultAva.svg'
import classNames from 'classnames'
import downArrow from '../../images/downArrow.svg'
import {useOutsideClick} from '../../common/Hooks/useOutsideClick'

const Header = () => {
    const dispatch = useDispatch()

    const isAuth = useSelector((state) => getIsAuth(state))
    const {data: login} = useGetAuthUserLoginQuery(undefined, {
        refetchOnMountOrArgChange: true, skip: !isAuth
    })
    const {data: email} = useGetAuthUserEmailQuery(undefined, {
        refetchOnMountOrArgChange: true, skip: !isAuth
    })
    const {data: authUserId} = useGetAuthUserIdQuery(undefined, {
        refetchOnMountOrArgChange: true, skip: !isAuth
    })
    const {data: smallPhoto} = useGetAuthUserAvaQuery(authUserId, {
        refetchOnMountOrArgChange: true, skip: !authUserId
    })
    const [logoutUser] = useLogoutMutation()
    const [isOpen, setIsOpen] = useState(false)
    const outsideClick = () => {
        setIsOpen(false)
    }
    const onAvaClick = () => {
        setIsOpen(!isOpen)
    }
    const ref = useOutsideClick(outsideClick)
    window.isOpen = isOpen
    return <header className={'header'}>
        <div className={'divWrapper'}>
            <div style={{marginLeft: '35px'}}>
                <img className={'logo'} src={logo} alt={'Hyperborea'}/>
                <span className={'title'}>Hyperborea</span>
            </div>
            {isAuth ? <>
                <div className={classNames({'accountBlock': true, 'openedSettings': isOpen})} onClick={onAvaClick}>
                    <img className={'ava'} src={smallPhoto && isAuth ? smallPhoto : defaultAva} alt={'avatar'}/>
                    <img className={'arrow'} src={downArrow} alt={'arrow'}/>
                    <span ref={ref} className={classNames({'settings': true, 'eSettings': isOpen})}>
                <span>
                    <span>{login}</span>
                    <div>{email}</div>
                    <div onClick={async () => {
                        dispatch(setIsLoggingOut(true))
                        await logoutUser()
                        await window.location.reload()
                        dispatch(setIsLoggingOut(false))
                        setIsOpen(false)
                        dispatch(setAuth(false))
                    }} className={'logOut'}>Logout</div>
                </span>
            </span>
                </div>
            </> : <NavLink className={'logIn'} to={'/login'}>
                <button>
                    Sign in
                </button>
            </NavLink>}
        </div>
    </header>
}

export default compose(memo)(Header)
