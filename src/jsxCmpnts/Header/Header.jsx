import React from 'react'
import classes from './Header.module.css'
import logo from '../../images/logo.jpg'

const Header = () => {
    return <header className={classes.header}>
        <img src={logo}/>
    </header>
}

export default Header