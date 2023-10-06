import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {maxLengthCreator, requireField} from '../../common/functions/validators'
import {Textarea} from '../../common/FormsControls/FormsControls'

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'login'} name={'login'} component={Textarea} validate={[requireField, maxLengthCreator(100)]}/>
        </div>
        <div>
            <Field placeholder={'password'} name={'password'} component={Textarea} validate={[requireField, maxLengthCreator(50)]}/>
        </div>
        <div>
            <Field type={'checkbox'} name={'rememberMe'} component={'input'}/> remember me
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
        //thunk(formData) todo ZAVTRA RAZBEREMSIA S ETIM EBANYM REDIUSEROM
    }

    return <div>
        <div>
            <h2>LOGIN</h2>
        </div>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Login