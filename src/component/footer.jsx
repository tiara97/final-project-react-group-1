import React from "react"
import {makeStyles,Typography} from "@material-ui/core"
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const useStyles = makeStyles(()=>(
    {
        root:{
            padding: 20,
            backgroundColor: "#f3f3f3",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        },
        iconContainer:{
            width: "10vw",
            display: "flex",
            justifyContent: "space-evenly"
        }
    }
))

const Footer = ()=>{
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <div>
                <Typography variant="body1">Copyright &copy; 2020 Furniture</Typography>
            </div>
            <div className={classes.iconContainer}>
                <GitHubIcon/>
                <InstagramIcon/>
                <WhatsAppIcon/>
            </div>
        </div>
    )
}

export default Footer