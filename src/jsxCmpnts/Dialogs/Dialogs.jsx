import React, {memo} from 'react'
import classes from './Dialogs.module.css'
import Dialog from './Dialog/Dialog'
import {useSelector} from 'react-redux'
import {getDialogsData} from '../../selectors/dialogsSelectors'
import {compose} from 'redux'
import {withAuthNavigate} from '../../common/HOCs/withAuthNavigate'

const Dialogs = props => {

    const dialogsData = useSelector((state) => getDialogsData(state))

    return <div className={classes.content}>
        <div className={classes.page}>
            <div className={classes.dialogs}>
                {dialogsData.map(el => <Dialog key={el.id} name={el.name} id={el.id}/>)}
            </div>
        </div>
    </div>
}

export default compose(withAuthNavigate, memo)(Dialogs)
