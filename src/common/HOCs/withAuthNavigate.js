import React, {memo} from 'react'
import {Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getIsAuth} from '../../selectors/authSelectors'
import {compose} from 'redux'

export const withAuthNavigate = (Component) => {
    const RedirectComponent = props => {
        const isAuth = useSelector((state) => getIsAuth(state))
        if (!isAuth) return <Navigate to={'/login'}/> //esli my autenficirovany, to idiom dal'she
        return <Component/>
    }
    return compose(memo)(RedirectComponent)
}
