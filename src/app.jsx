import React from 'react'
import {Route} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

// import component
import Navbar from "./component/navbar"

// import page
import Home from "./pages/homepage"
import Category from "./pages/categoryPage"
import Products from "./pages/products"
import ProductDetails from "./pages/productDetails"
import Cart from "./pages/cartPage"
import CheckOut from "./pages/checkOutPage"
import Register from "./pages/register"
import Login from "./pages/login"
import Account from './pages/account'
import Verification from './pages/verification'

import {userKeepLogin} from './action'
import ProductAdmin from './pages/productAdmin'


const App = () =>{
    const dispatch = useDispatch()
    React.useEffect(()=> {
        dispatch(userKeepLogin())
    }, [])
    return(
        <div>
            <Navbar/>
            <Route path="/" component={Home} exact/>
            <Route path="/Produk" component={Products} />
            <Route path="/Produk-Detail" component={ProductDetails} />
            <Route path="/Kategori" component={Category}/>
            <Route path="/Cart" component={Cart}/>
            <Route path="/Checkout" component={CheckOut}/>
            <Route path="/Register" component={Register} />
            <Route path="/Login" component={Login} />
            <Route path="/Verifikasi" component={Verification} />
            <Route path="/Akun" component={Account} />
            <Route path="/Produk-Admin" component={ProductAdmin}/>
        </div>
    )
}

export default App