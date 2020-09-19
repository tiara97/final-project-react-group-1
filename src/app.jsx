import React from 'react'
import {Route} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

// import component
import Navbar from "./component/navbar"

// import page
import Home from "./pages/homepage"
import Category from "./pages/categoryPage"
<<<<<<< HEAD
import LoginRegister from "./pages/loginRegister"
import Cart from "./pages/cartPage"
import CheckOut from "./pages/checkOutPage"
=======
import Register from "./pages/register"
import Login from "./pages/login"
import Account from './pages/account'
import Verification from './pages/verification'

import {userKeepLogin} from './action'
>>>>>>> 88a1a9ed5bdbac493d21f198a28dca5602be9b05

const App = () =>{
    const dispatch = useDispatch()
    React.useEffect(()=> {
        dispatch(userKeepLogin())
    }, [])
    return(
        <div>
            <Navbar/>
            <Route path="/" component={Home} exact/>
            <Route path="/Kategori" component={Category}/>
<<<<<<< HEAD
            <Route path="/login-register" component={LoginRegister} />
            <Route path="/Cart" component={Cart}/>
            <Route path="/Checkout" component={CheckOut}/>
=======
            <Route path="/Register" component={Register} />
            <Route path="/Login" component={Login} />
            <Route path="/Akun" component={Account} />
            <Route path="/Verifikasi" component={Verification} />
>>>>>>> 88a1a9ed5bdbac493d21f198a28dca5602be9b05
        </div>
    )
}

export default App