import React, {memo, useState} from 'react'
import {Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setAuth, setIsLoggingOut, setLogInError} from '../../redux/authSlice'
import {getIsAuth, getLogInError} from '../../selectors/authSelectors'
import {compose} from 'redux'
import {useLoginMutation} from '../../API/authAPI'
import {useForm} from 'react-hook-form'
import './LogIn.css'

const LogIn = props => {
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}, watch} = useForm({mode: 'onChange'})
    const isAuth = useSelector((state) => getIsAuth(state))
    const logInError = useSelector((state) => getLogInError(state))
    let [emailLength, setEmailLength] = useState(0)
    let [passwordLength, setPasswordLength] = useState(0)
    const [login] = useLoginMutation()

    watch((data) => {
        if (data.email) {
            setEmailLength(data.email.length)
        }
    })
    watch((data) => {
        if (data.password) {
            setPasswordLength(data.password.length)
        }
    })
    const onSubmit = async data => {
        const email = data.email
        const password = data.password
        const rememberMe = true
        dispatch(setIsLoggingOut(true))
        let response = await login({email, password, rememberMe})
        if (response.data.resultCode === 0) {
            await window.location.reload()
            dispatch(setAuth(true))
            dispatch(setLogInError(null))
            dispatch(setIsLoggingOut(false))
        } else if (response.data.resultCode === 1 || response.data.resultCode === 10) {
            dispatch(setIsLoggingOut(false))
            dispatch(setLogInError(response.data.messages[0]))
        }
    }

    if (isAuth) {
        return <Navigate to={'/news'}/>
    }

    return <div className={'logInPage'}>
        <div className={'logInBlock'}>
            <h2>Sign in to your account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email', {
                    required: 'Email require filed',
                    maxLength: {value: 100, message: 'max length is 100'},
                    pattern: {
                        value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                        message: 'Please enter valid email!'
                    }
                })} placeholder={'email'}></input>
                {errors.email && <div style={{color: 'red'}}>{errors.email.message}</div>}
                {100 - emailLength < 20 && <div>{`${100 - emailLength} symbols left`}</div>}
                <input {...register('password', {
                    required: 'Password require filed',
                    maxLength: {value: 50, message: 'max length is 50'}
                })} placeholder={'password'}></input>
                {errors.password && <div style={{color: 'red'}}>{errors.password.message}</div>}
                {50 - passwordLength < 10 && <div>{`${50 - passwordLength} symbols left`}</div>}
                {/*<div>*/}
                {/*    <input {...register('rememberMe')} type={'checkbox'}/>remember me*/}
                {/*</div>*/}
                <div>
                    <button>Login</button>
                </div>
                {logInError && <div style={{color: 'red'}}>{logInError}</div>}
            </form>
        </div>
    </div>
}

export default compose(memo)(LogIn)