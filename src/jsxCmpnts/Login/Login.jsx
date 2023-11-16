import React, {memo} from 'react'
import {Field, reduxForm} from 'redux-form'
import {maxLengthCreator, requireField} from '../../common/functions/validators'
import {Input} from '../../common/FormsControls/FormsControls'
import {Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setAuth} from '../../redux/authSlice'
import {getIsAuth} from '../../selectors/authSelectors'
import {compose} from 'redux'
import {useLoginMutation} from '../../API/authAPI'

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'email'} name={'email'} component={Input}
                   validate={[requireField, maxLengthCreator(100)]}/>
        </div>
        <div>
            <Field placeholder={'password'} name={'password'} component={Input}
                   validate={[requireField, maxLengthCreator(50)]}/>
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

const Login = props => {
    const dispatch = useDispatch()

    const isAuth = useSelector((state) => getIsAuth(state))

    const [login] = useLoginMutation()

    const onSubmit = async (formData) => {
        const {email, password, rememberMe} = formData
        let response = await login({email, password, rememberMe})
        if (response.data.resultCode === 0) {
            dispatch(setAuth(true))
        } else if (response.data.resultCode === 1 || response.data.resultCode === 10) {
            alert(response.data.messages[0])
        }
    }

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return <div>
        <div>
            <h2>LOGIN</h2>
        </div>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default compose(memo)(Login)