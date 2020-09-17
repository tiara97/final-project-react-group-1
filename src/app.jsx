import React from 'react'
import {Route} from "react-router-dom"

import Navbar from "./component/navbar"

import Home from "./pages/homepage"
import Category from "./pages/categoryPage"

const App = () =>{
    return(
        <div>
            <Navbar/>
            <Route path="/" component={Home} exact/>
            <Route path="/Kategori" component={Category}/>
        </div>
    )
}

export default App