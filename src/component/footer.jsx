import React from "react"
import {makeStyles,Typography} from "@material-ui/core"

const useStyles = makeStyles(()=>(
    {
        root:{
            padding: 20,
            backgroundColor: "#f3f3f3"
        }
    }
))

const Footer = ()=>{
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <Typography variant="body1">Copyright 2020 Furniture</Typography>
        </div>
    )
}

export default Footer