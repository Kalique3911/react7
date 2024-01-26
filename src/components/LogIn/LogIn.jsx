import React, {memo} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setAuth, setIsLoggingOut, setLogInError} from '../../redux/authSlice'
import {getIsAuth, getLogInError} from '../../selectors/authSelectors'
import {compose} from 'redux'
import {useLoginMutation} from '../../API/authAPI'
import {useForm} from 'react-hook-form'
import './LogIn.css'

const LogIn = () => {
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onChange'})
    const isAuth = useSelector((state) => getIsAuth(state))
    const logInError = useSelector((state) => getLogInError(state))
    const [login] = useLoginMutation()

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
            <div style={{width: '280px', margin: '0px 35px 0px 35px'}}>
                <div style={{fontWeight: 'normal'}}>To sign in get registered <Link
                    to={'https://social-network.samuraijs.com/signUp'}>here</Link> or use free account:
                </div>
                <div>
                    <span style={{fontWeight: 'normal'}}>Email:</span>
                    <span> free@samuraijs.com</span>
                </div>
                <div>
                    <span style={{fontWeight: 'normal'}}>Password:</span>
                    <span> free</span>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email', {
                    required: 'Email is required',
                    maxLength: {value: 100, message: 'max length is 100'},
                    pattern: {
                        value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                        message: 'Please enter valid email!'
                    }
                })} placeholder={'email'} style={{top: '360px'}}></input>
                {errors.email && <div style={{color: 'red', position: 'absolute', top: '410px'}}>{errors.email.message}</div>}
                <input {...register('password', {
                    required: 'Password is required',
                    maxLength: {value: 50, message: 'max length is 50'}
                })} placeholder={'password'} style={{top: '430px'}}></input>
                {errors.password && <div style={{color: 'red', position: 'absolute', top: '480px'}}>{errors.password.message}</div>}
                {/*<div>*/}
                {/*    <input {...register('rememberMe')} type={'checkbox'}/>remember me*/}
                {/*</div>*/}
                <div>
                    <button>Sign in</button>
                </div>
                {logInError && <div style={{color: 'red'}}>{logInError}</div>}
            </form>
        </div>
    </div>
}

export default compose(memo)(LogIn)