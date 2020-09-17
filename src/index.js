import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter} from "react-router-dom"

import App from "./app"

// create global store
import {createStore, applyMiddleware} from "redux"
import {Provider} from "react-redux"
import ReduxThunk from "redux-thunk"
import allReducers from "./reducer"
import {composeWithDevTools} from "redux-devtools-extension"

const globalStore = createStore(allReducers, {},composeWithDevTools(applyMiddleware(ReduxThunk)) )
globalStore.subscribe(()=> console.log("Global Store : ", globalStore.getState()))


ReactDOM.render(
    <Provider store={globalStore}>
     <BrowserRouter>
        <App/>
     </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)