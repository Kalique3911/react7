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
    const [isOpen, setIsOpen] = useState(false)
    const onAvaClick = () => {
        debugger
        setIsOpen(!isOpen)
    }

    return <header className={'header'}>
        <img className={'logo'} src={logo} alt={'Hyperborea'}/>
        <img className={'ava'} src={smallPhoto ? smallPhoto : defaultAva} alt={'small photo'}
             onClick={onAvaClick}
        />
        <div className={'loginBlock'}>
            {isAuth
                ? <div className={classNames({'settings': true, 'eSettings': isOpen})}>
                    <div>
                        <div>{login}</div>
                        <span onDoubleClick={async () => {
                            await logoutUser()
                            setIsOpen(false)
                            dispatch(setAuth(false))
                        }}>Logout</span>
                    </div>
                </div>
                : <div className={classNames({'settings': true, 'eSettings': isOpen})}><NavLink to={'/login'}>Login</NavLink></div>}
        </div>
    </header>
}

export default compose(memo)(Header)
