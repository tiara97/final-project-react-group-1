import React from "react"
import {Typography, Button} from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"

// import component
import CarouselComp from "../component/carousel"
import {userLogout} from '../action'

const Home = () =>{
    const dispatch = useDispatch()
    return(
        <div style={styles.root}>
            <Typography variant="h2">Home Page</Typography>
            <CarouselComp/>
            <Button variant='contained' onClick={()=>dispatch(userLogout())}>
                Logout
            </Button>
        </div>
    )
}

const styles = {
    root:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10vh"
    }
}
export default Home