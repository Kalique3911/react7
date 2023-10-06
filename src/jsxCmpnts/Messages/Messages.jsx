import classes from './Messages.module.css'
import React from 'react'
import Message from './Message/Message'
import {Navigate} from 'react-router-dom'
import {Field, reduxForm} from 'redux-form'
import {Textarea} from '../../common/FormsControls/FormsControls'
import {maxLengthCreator, requireField} from '../../common/functions/validators'

const MessagesForm = (props) => {
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

const Messages = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
        props.addMessage(formData.message)
        formData.message = ''
    }

    if (!props.isAuth) {
        return <Navigate to={'/login'}/>
    }

    return <div className={classes.messages}>
        <div>
            <h3>{props.name}</h3>
        </div>
        <div>
            {props.messagesData.map(el => <Message key={el.id} text={el.message}/>)}
        </div>
        <MessagesReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Messages