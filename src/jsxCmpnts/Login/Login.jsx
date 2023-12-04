import React, {memo, useState} from 'react'
import {Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setAuth, setLoginError} from '../../redux/authSlice'
import {getIsAuth, getLoginError} from '../../selectors/authSelectors'
import {compose} from 'redux'
import {useLoginMutation} from '../../API/authAPI'
import {useForm} from 'react-hook-form'

const Login = props => {
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}, watch} = useForm({mode: 'onChange'})
    const isAuth = useSelector((state) => getIsAuth(state))
    const loginError = useSelector((state) => getLoginError(state))
    let [emailLength, setEmailLength] = useState(0)
    let [passwordLength, setPasswordLength] = useState(0)
    const [login] = useLoginMutation()

    watch((data) => {if (data.email) {setEmailLength(data.email.length)}})
    watch((data) => {if (data.password) {setPasswordLength(data.password.length)}})
    const onSubmit = async data => {
        const email = data.email
        const password = data.password
        const rememberMe = data.rememberMe
        let response = await login({email, password, rememberMe})
        if (response.data.resultCode === 0) {
            window.location.reload()
            dispatch(setAuth(true))
            dispatch(setLoginError(null))
        } else if (response.data.resultCode === 1 || response.data.resultCode === 10) {
            dispatch(setLoginError(response.data.messages[0]))
        }
    }

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return <div>
        <div>
            <h2>LOGIN</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input {...register('email', {
                    required: 'Email require filed',
                    maxLength: {value: 100, message: 'max length is 100'},
                    pattern: {
                        value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                        message: 'Please enter valid email!'
                    }
                })} placeholder={'email'}></input>
            </div>
            {errors.email && <div style={{color: 'red'}}>{errors.email.message}</div>}
            {100 - emailLength < 20 && <div>{`${100 - emailLength} symbols left`}</div>}
            <div>
                <input {...register('password', {
                    required: 'Password require filed',
                    maxLength: {value: 50, message: 'max length is 50'}
                })} placeholder={'password'}></input>
            </div>
            {errors.password && <div style={{color: 'red'}}>{errors.password.message}</div>}
            {50 - passwordLength < 10 && <div>{`${50 - passwordLength} symbols left`}</div>}
            <div>
                <input {...register('rememberMe')} type={'checkbox'}/>remember me
            </div>
            <div>
                <button>Login</button>
            </div>
            {loginError && <div style={{color: 'red'}}>{loginError}</div>}
        </form>
    </div>
}

export default compose(memo)(Login)