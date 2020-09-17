import React from 'react'
import {Route} from "react-router-dom"

import Navbar from "./component/navbar"

import Home from "./pages/homepage"
import loginRegister from "./pages/loginRegister"

const App = () =>{
    return(
        <div>
            <Navbar/>
            <Route path="/" component={Home} exact/>
            <Route path="/login-register" component={loginRegister} />
        </div>
    )
}

export default App