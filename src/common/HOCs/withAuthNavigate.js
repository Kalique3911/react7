import React from 'react'
import {Navigate} from 'react-router-dom'
import {connect} from 'react-redux'

const mapStateToPropsForNavigate = (state) => ({
    isAuth: state.auth.isAuth
})

export const withAuthNavigate = (Component) => {

    const RedirectComponent = props => {
        if (!props.isAuth) return <Navigate to={'/login'}/> //esli my autenficirovany, to idiom dal'she

        return <Component {...props}/>
    }

    return connect(mapStateToPropsForNavigate)(RedirectComponent)

}
