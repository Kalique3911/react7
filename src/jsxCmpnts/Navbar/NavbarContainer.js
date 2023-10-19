import React from 'react'
import {connect} from 'react-redux'
import Navbar from './Navbar'

function NavbarContainer(props) {
    return <Navbar {...props}/>
}

const mapStateToProps = (state) => {
    return {
        authUserId: state.auth.id
    }}

export default connect(mapStateToProps, null)(NavbarContainer)
