import authSlice, {setAuthUserData} from '../redux/authSlice'
import defaultAva from '../images/defaultAva.jpg'

let state = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    messages: [],
    fieldsErrors: [],
    resultCode: 0,
    smallPhoto: defaultAva,
    isInitialized: false
}


it('emailTest', () => {

    let newState = authSlice(state, setAuthUserData(1, 'kal@gmail.com', 'Kal', true))

    expect(newState.email).toBe('kal@gmail.com')
})

it('idTest', () => {

    let newState = authSlice(state, setAuthUserData(1, 'kal@gmail.com', 'Kal', true))

    expect(newState.id).toBe(1)
})

it('loginTest', () => {

    let newState = authSlice(state, setAuthUserData(1, 'kal@gmail.com', 'Kal', true))

    expect(newState.login).toBe('Kal')
})

it('isAuthTest', () => {

    let newState = authSlice(state, setAuthUserData(1, 'kal@gmail.com', 'Kal', true))

    expect(newState.isAuth).toBe(true)
})