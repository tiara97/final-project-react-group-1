import React from 'react'
import {Route} from "react-router-dom"

import Navbar from "./component/navbar"

import Home from "./pages/homepage"
import Category from "./pages/categoryPage"
import LoginRegister from "./pages/loginRegister"
import Register from "./pages/register"
import Account from './pages/account'
import Verification from './pages/verification'

const App = () =>{
    return(
        <div>
            <Navbar/>
            <Route path="/" component={Home} exact/>
            <Route path="/Kategori" component={Category}/>
            <Route path="/Login-register" component={LoginRegister} />
            <Route path="/Register" component={Register} />
            <Route path="/Akun" component={Account} />
            <Route path="/Verifikasi" component={Verification} />
        </div>
    )
}

export default App