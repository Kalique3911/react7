import React from 'react'
import './index.css'
import reportWebVitals from './reportWebVitals'
import store from './redux/store'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))

window.store = store

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
)

reportWebVitals()
