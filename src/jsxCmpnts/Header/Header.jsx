import React, {memo, useState} from 'react'
import './Header.css'
import logo from '../../images/logo.jpg'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getIsAuth} from '../../selectors/authSelectors'
import {setAuth} from '../../redux/authSlice'
import {compose} from 'redux'
import {
    useGetAuthUserEmailQuery, useGetAuthUserIdQuery, useGetAuthUserLoginQuery, useLogoutMutation
} from '../../API/authAPI'
import {useGetAuthUserAvaQuery} from '../../API/profileAPI'
import defaultAva from '../../images/defaultAva.jpg'
import classNames from 'classnames'
import downArrow from '../../images/downArrow.svg'
import {useOutsideClick} from '../../common/Hooks/useOutsideClick'

const Header = props => {
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
        <img className={'logo'} src={logo} alt={'Hyperborea'}/>
        <span className={'title'}>Hyperborea</span>
        {isAuth ? <>
            <div className={classNames({'loginBlock': true, 'openedSettings': isOpen})} onClick={onAvaClick}>
                <img className={'ava'} src={smallPhoto && isAuth ? smallPhoto : defaultAva} alt={'avatar'}/>
                <img className={'arrow'} src={downArrow} alt={'arrow'}/>
            </div>
            <span ref={ref} className={classNames({'settings': true, 'eSettings': isOpen})}>
                <span>
                    <span>{login}</span>
                    <div>{email}</div>
                    <div onClick={async () => {
                        await logoutUser()
                        window.location.reload()
                        setIsOpen(false)
                        dispatch(setAuth(false))
                    }} className={'logout'}>Logout</div>
                </span>
            </span>
        </> : <span className={'login'}><NavLink
            to={'/login'}>Login</NavLink></span>}
    </header>
}

export default compose(memo)(Header)
