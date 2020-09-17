import React from 'react'
import {Route} from "react-router-dom"

import Navbar from "./component/navbar"

import Home from "./pages/homepage"
import Category from "./pages/categoryPage"
import LoginRegister from "./pages/loginRegister"

const App = () =>{
    return(
        <div>
            <Navbar/>
            <Route path="/" component={Home} exact/>
            <Route path="/Kategori" component={Category}/>
            <Route path="/login-register" component={LoginRegister} />
        </div>
    )
}

export default App