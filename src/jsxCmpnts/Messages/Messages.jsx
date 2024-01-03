import './Messages.css'
import React, {memo, useEffect, useRef, useState} from 'react'
import Message from './Message/Message'
import {compose} from 'redux'
import {useForm} from 'react-hook-form'
import {withAuthNavigate} from '../../common/HOCs/withAuthNavigate'

const Messages = props => {
    const {register, handleSubmit, formState: {errors}, reset, watch} = useForm({mode: 'onChange'})
    let [messageLength, setMessageLength] = useState(0)
    let [messagesData, setMessagesData] = useState([])
    let [readyStatus, setReadyStatus] = useState('pending')
    let [scroll, setScroll] = useState(true)
    const messagesRef = useRef()
    const [wsChannel, setWsChannel] = useState(null)
    window.md = messagesData
    let createChannel
    useEffect(() => {
        let ws
        const closeHandler = () => {
            setReadyStatus('closed')
            setTimeout(createChannel, 3000)
        }
        createChannel = () => {
            if (ws) {
                ws.removeEventListener('close', closeHandler)
                ws.close()
            }
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler) // this subscription does not work
            setWsChannel(ws)
        }
        createChannel()
        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])
    useEffect(() => {
        if (wsChannel) {
            wsChannel.onopen = () => {
                setReadyStatus(`ready`)
            }
            return () => {
                wsChannel.removeEventListener('open', () => {
                    setReadyStatus(`ready`)
                })
            }
        }
    }, [wsChannel])
    useEffect(() => {
        if (wsChannel) {
            wsChannel.onmessage = (e) => {
                setMessagesData((prev) => [...prev, ...JSON.parse(e.data)])
            }
            return () => {
                wsChannel.removeEventListener('message', (e) => {
                    setMessagesData((prev) => [...prev, ...JSON.parse(e.data)])
                })
            }
        }
    }, [wsChannel])
    useEffect(() => {
        if (scroll) {
            messagesRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messagesData])

    const onSubmit = async data => {
        await wsChannel.send(data.message)
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

export default compose(withAuthNavigate, memo)(Messages)