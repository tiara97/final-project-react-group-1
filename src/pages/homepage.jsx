import React from "react"
import {Typography, Button} from "@material-ui/core"

// import component
import CarouselComp from "../component/carousel"

const Home = () =>{
    return(
        <div style={styles.root}>
            <Typography variant="h2">Home Page</Typography>
            <CarouselComp/>
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