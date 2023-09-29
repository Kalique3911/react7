import React from "react"
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {usersData: state.dialogsPage.usersData}
}

const DialogsContainer = connect(mapStateToProps)(Dialogs)

export default DialogsContainer