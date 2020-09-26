import React from 'react'
import { Link } from 'react-router-dom'
import { Button, makeStyles } from '@material-ui/core'

const useStyle = makeStyles(() => ({
    root : {
        height : 'calc(100vh - 64px)',
        width : '100%',
        padding : '64px 10% 3% 10%',
        backgroundColor : '#bdc3c7',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center'
    },
    title : {
        fontSize : 100,
        marginBottom : '3%'
    },
    link : {
        marginTop : '2%',
        textDecoration : 'none'
    }
}))

export default function NotFound() {
    const classes = useStyle()

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>404</h1>
            <h1>Ooops! Page not found.</h1>
            <Link to='/' className={classes.link}>
                <Button color = "primary" variant="outlined" className={classes.button}>Back to Home</Button>
            </Link>
        </div>
    )
}