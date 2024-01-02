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
    }
    watch((data) => {
        if (data.message) {
            setMessageLength(data.message.length)
        }
    })
    const scrollHandler = (e) => {
        if (((e.currentTarget.scrollHeight - e.currentTarget.scrollTop) - e.currentTarget.clientHeight) > 300) {
            setScroll(false)
        } else {
            setScroll(true)
        }
    }

    return <div className={'messages'}>
        <div className={'chat'} onScroll={scrollHandler}>
            {messagesData && messagesData.map((el, i) => {
                if (el.userName === messagesData[i - 1]?.userName) {
                    return <Message key={el.index} text={el.message} messageType={'normal'}/>
                } else {
                    return <Message key={el.index} userName={el.userName}
                                    text={el.message} photo={el.photo} messageType={'head'}/>
                }
            })}
            <div ref={messagesRef}></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={'form'}>
            <span style={{display: 'flex'}}>
            <textarea {...register('message', {
                required: 'Message require filed', maxLength: {value: 2000, message: 'max length is 2000'}
            })} placeholder={'your new message'}
            />
            <span>
                <button disabled={readyStatus !== 'ready'}>Send</button>
            </span>
                </span>
            {errors.message && <div style={{color: 'red'}}>{errors.message.message}</div>}
            {2000 - messageLength < 200 && <div>{`${2000 - messageLength} symbols left`}</div>}
        </form>
    </div>
}

export default compose(memo)(Messages)