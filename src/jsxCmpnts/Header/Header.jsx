import React, {memo, useState} from 'react'
import './Header.css'
import logo from '../../images/logo.jpg'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getIsAuth} from '../../selectors/authSelectors'
import {setAuth} from '../../redux/authSlice'
import {compose} from 'redux'
import {useGetAuthUserIdQuery, useGetAuthUserLoginQuery, useLogoutMutation} from '../../API/authAPI'
import {useGetAuthUserAvaQuery} from '../../API/profileAPI'
import defaultAva from '../../images/defaultAva.jpg'
import classNames from 'classnames'
import downArrow from '../../images/downArrow.svg'

const Header = props => {
    const dispatch = useDispatch()

    const isAuth = useSelector((state) => getIsAuth(state))
    const {data: login} = useGetAuthUserLoginQuery(undefined, {
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
    const onAvaClick = () => {
        setIsOpen(!isOpen)
    }

    return <header className={'header'}>
        <img className={'logo'} src={logo} alt={'Hyperborea'}/>
        <span className={'title'}>Hyperborea</span>
        <div className={classNames({'loginBlock': true, 'openedSettings': isOpen})} onClick={onAvaClick}>
            <img className={'ava'} src={smallPhoto && isAuth ? smallPhoto : defaultAva} alt={'small photo'}/>
            <img className={'arrow'} src={downArrow} alt={'arrow'}/>
        </div>
        {isAuth ? <span className={classNames({'settings': true, 'eSettings': isOpen})}>
                <span>
                    <span>{login}</span>
                    <div onClick={async () => {
                        await logoutUser()
                        setIsOpen(false)
                        dispatch(setAuth(false))
                    }} className={'logout'}>Logout</div>
                </span>
            </span> : <span className={classNames({'settings': true, 'eSettings': isOpen})}><NavLink
            to={'/login'}>Login</NavLink></span>}
    </header>
}

export default compose(memo)(Header)
