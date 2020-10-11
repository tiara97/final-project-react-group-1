import React from 'react'
import {Route, Switch} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

// import component
import Navbar from "./component/navbar"
import Footer from "./component/footer"

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
import Confirmation from "./pages/confirmation"
import ProductAdmin from './pages/productAdmin'
import TransactionAdmin from './pages/transactionAdmin'
import AccountAdmin from "./pages/accountAdmin"
import NotFound from './pages/404'
import Receipt from "./pages/receipt"
import Ongkir from "./pages/ongkir"
import {userKeepLogin} from './action'


const App = () =>{
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(userKeepLogin())
    }, [])

    const { role } = useSelector((state) => {
        return {
            role: state.userReducer.role
        }
    })
    
    if(role === 3){
        return (
            <div>
                <Navbar/>
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/Produk" component={Products} />
                        <Route path="/Produk-Detail" component={ProductDetails} />
                        <Route path="/Kategori" component={Category}/>
                        <Route path="/Cart" component={Cart}/>
                        <Route path="/Checkout" component={CheckOut}/>
                        <Route path="/Register" component={Register} />
                        <Route path="/Login" component={Login} />
                        <Route path="/Akun" component={Account} />
                        <Route path="/Konfirmasi" component={Confirmation}/>
                        <Route path="/Verifikasi" component={Verification} />
                        <Route path="/Receipt" component={Receipt}/>
                        <Route path="/Ongkir" component={Ongkir}/>
                        <Route path='*' component={NotFound}/>
                    </Switch>
                <Footer/>
            </div>
        )
    } else if (role === 1 || role === 2){
        return (
            <div>
                <Navbar/>
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/Register" component={Register} />
                        <Route path="/Login" component={Login} />
                        <Route path="/Produk-Admin" component={ProductAdmin}/>
                        <Route path="/Transaksi-Admin" component={TransactionAdmin}/>
                        <Route path="/Akun-Admin" component={AccountAdmin}/>
                        <Route path='*' component={NotFound}/>
                    </Switch>
                <Footer/>
            </div>
        )
    } else {
        return (
            <div>
                <Navbar/>
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/Register" component={Register} />
                        <Route path="/Login" component={Login} />
                        <Route path="/Produk" component={Products} />
                        <Route path="/Produk-Detail" component={ProductDetails} />
                        <Route path="/Kategori" component={Category}/>
                        <Route path="/Verifikasi" component={Verification} />
                        <Route path='*' component={NotFound}/>
                    </Switch>
                <Footer/>
            </div>
        )
    }
}

export default App