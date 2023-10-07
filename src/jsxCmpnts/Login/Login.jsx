import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {maxLengthCreator, requireField} from '../../common/functions/validators'
import {Textarea} from '../../common/FormsControls/FormsControls'
import {Navigate} from 'react-router-dom'

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'email'} name={'email'} component={Textarea}
                   validate={[requireField, maxLengthCreator(100)]}/>
        </div>
        <div>
            <Field placeholder={'password'} name={'password'} component={Textarea}
                   validate={[requireField, maxLengthCreator(50)]}/>
        </div>
        <div>
            <Field type={'checkbox'} name={'rememberMe'} component={'input'}/> remember me
        </div>
        {/*<div>*/}
        {/*    <Field type={'checkbox'} name={'captcha'} component={'input'}/> i am tadzhik*/}
        {/*</div>*/}
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
        props.loginUser(formData)
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return <div>
        <div>
            <h2>LOGIN</h2>
        </div>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Login