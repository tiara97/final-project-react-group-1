import React from 'react'
import {Route} from "react-router-dom"

// import component
import Navbar from "./component/navbar"

// import page
import Home from "./pages/homepage"
import Category from "./pages/categoryPage"
import LoginRegister from "./pages/loginRegister"
import Cart from "./pages/cartPage"
import CheckOut from "./pages/checkOutPage"

const App = () =>{
    return(
        <div>
            <Navbar/>
            <Route path="/" component={Home} exact/>
            <Route path="/Kategori" component={Category}/>
            <Route path="/login-register" component={LoginRegister} />
            <Route path="/Cart" component={Cart}/>
            <Route path="/Checkout" component={CheckOut}/>
        </div>
    )
}

export default App