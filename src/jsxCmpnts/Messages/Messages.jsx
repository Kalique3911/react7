import classes from './Messages.module.css'
import React, {memo} from 'react'
import Message from './Message/Message'
import {useDispatch, useSelector} from 'react-redux'
import {getDialog, getMessagesData} from '../../selectors/dialogsSelectors'
import {compose} from 'redux'
import {setMessage} from '../../redux/dialogsSlice'
import {useForm} from 'react-hook-form'
import {useState} from 'react'

const Messages = props => {
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}, reset, watch} = useForm({mode: 'onChange'})

    let [messageLength, setMessageLength] = useState(0)

    const messagesData = useSelector((state) => getMessagesData(state))
    const dialog = useSelector((state) => {
        getDialog(state)
    })
    const onSubmit = data => {
        dispatch(setMessage(data.message))
        setMessageLength(0)
        reset()
    }

    watch((data) => {if (data.message) {setMessageLength(data.message.length)}})

    return <div className={classes.messages}>
        <div>
            <h3>{dialog}</h3>
        </div>
        <div>
            {messagesData.map(el => <Message key={el.id} text={el.message}/>)}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('message', {
                required: 'Message require filed',
                maxLength: {value: 2000, message: 'max length is 2000'}
            })} placeholder={'your new message'}
            />
            {errors.message && <div style={{color: 'red'}}>{errors.message.message}</div>}
            {2000 - messageLength < 200 && <div>{`${2000 - messageLength} symbols left`}</div>}
            <div>
                <button>Send</button>
            </div>
        </form>
    </div>
}

export default compose(memo)(Messages)