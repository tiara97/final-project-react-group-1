import React from "react"
import { Typography, Button, makeStyles} from "@material-ui/core"

// import component
import CarouselComp from "../component/carousel"

const useStyles = makeStyles(() => ({
    root:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10vh"
    }
}))

export default function Home (){
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <Typography variant="h2">Home Page</Typography>
            <CarouselComp/>
        </div>
    )
}