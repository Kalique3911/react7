import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/State";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
let render = (state) => {
    root.render(
        <React.StrictMode>
            <App state={store.getState()} dispatch={store.dispatch.bind(store)}/>
        </React.StrictMode>);

}

render(store.getState())

store.subscribe(render)

reportWebVitals();
