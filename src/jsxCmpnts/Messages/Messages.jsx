import classes from './Messages.module.css'
import React, {memo} from 'react'
import Message from './Message/Message'
import {Field, reduxForm} from 'redux-form'
import {Textarea} from '../../common/FormsControls/FormsControls'
import {maxLengthCreator, requireField} from '../../common/functions/validators'
import {useDispatch, useSelector} from 'react-redux'
import {getDialog, getMessagesData} from '../../selectors/dialogsSelectors'
import {setMessage} from '../../redux/dialogsSlice'
import {compose} from 'redux'

const MessagesForm = props => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'your new message'} name={'message'} component={Textarea}
                   validate={[requireField, maxLengthCreator(2000)]}/>
        </div>
        <div>
            <button>Send</button>
        </div>
    </form>
}

const MessagesReduxForm = reduxForm({form: 'messages'})(MessagesForm)

const Messages = props => {
    const dispatch = useDispatch()

    const messagesData = useSelector((state) => getMessagesData(state))
    const dialog = useSelector((state) => {getDialog(state)})

    const onSubmit = (formData) => {
        console.log(formData)
        dispatch(setMessage(formData.message))
    }

    return <div className={classes.messages}>
        <div>
            <h3>{dialog}</h3>
        </div>
        <div>
            {messagesData.map(el => <Message key={el.id} text={el.message}/>)}
        </div>
        <MessagesReduxForm onSubmit={onSubmit}/>
    </div>
}

export default compose(memo)(Messages)