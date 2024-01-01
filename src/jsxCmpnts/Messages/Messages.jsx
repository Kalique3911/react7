import './Messages.css'
import React, {memo, useEffect, useRef, useState} from 'react'
import Message from './Message/Message'
import {compose} from 'redux'
import {useForm} from 'react-hook-form'

const Messages = props => {
    const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    const {register, handleSubmit, formState: {errors}, reset, watch} = useForm({mode: 'onChange'})
    let [messageLength, setMessageLength] = useState(0)
    let [messagesData, setMessagesData] = useState([])
    let [readyStatus, setReadyStatus] = useState('pending')
    let [scroll, setScroll] = useState(true)
    const messagesRef = useRef()
    window.md = messagesData
    useEffect(() => {
        ws.onmessage = (e) => {
            setMessagesData((prev) => [...prev, ...JSON.parse(e.data)])
        }
    }, [])
    useEffect(() => {
        ws.onopen = () => {
            console.log('open')
            setReadyStatus('ready')
        }
        ws.onclose = () => {
            console.log('closed')
            setReadyStatus('closed')
        }
        ws.onerror = () => {
            console.log('error')
            setReadyStatus('closed')
        }
    }, [ws])
    useEffect(() => {
        if (scroll) {
            messagesRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messagesData])

    const onSubmit = async data => {
        await ws.send(data.message)
        setMessageLength(0)
        reset()
        // window.location.reload()
    }
    watch((data) => {
        if (data.message) {
            setMessageLength(data.message.length)
        }
    })
    const scrollHandler = (e) => {
        if (((e.currentTarget.scrollHeight - e.currentTarget.scrollTop) - e.currentTarget.clientHeight) > 400) {
            setScroll(false)
        } else {
            setScroll(true)
        }
    }

    return <div onScroll={scrollHandler} className={'messages'}>
        <div>
            {messagesData && messagesData.map(el => <Message key={el.index} userName={el.userName}
                                                             text={el.message} photo={el.photo}/>)}
        </div>
        <div ref={messagesRef}></div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('message', {
                required: 'Message require filed',
                maxLength: {value: 2000, message: 'max length is 2000'}
            })} placeholder={'your new message'}
            />
            {errors.message && <div style={{color: 'red'}}>{errors.message.message}</div>}
            {2000 - messageLength < 200 && <div>{`${2000 - messageLength} symbols left`}</div>}
            <div>
                <button disabled={readyStatus !== 'ready'}>Send</button>
            </div>
        </form>
    </div>
}

export default compose(memo)(Messages)