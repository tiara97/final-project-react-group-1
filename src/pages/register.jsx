import React from 'react'
import { TextField, Button, Paper, IconButton, OutlinedInput, InputAdornment, FormControl, InputLabel, makeStyles, Typography } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {useSelector, useDispatch} from "react-redux"
import {Link, Redirect} from "react-router-dom"

// import action
import {userRegister} from '../action'

const Register = () => {
    // declare className
    const classes = useStyles()

    // register state
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confpassword, setConfpassword] = React.useState('');
    const [visible1, setVisible1] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);

    const {id, errorReg} = useSelector(state => {
        return {
            id: state.userReducer.id,
            errorReg: state.userReducer.errorReg
        }
    })
    // invoke action
    const dispatch = useDispatch()
    const handleRegister = () => {
        const body = {username, password, confpassword, email}
        console.log(body)
    }
    return (
        <div className={classes.root}>
            <Paper className={classes.container} elevation={5}>
                <h1 className={classes.text}>Register Page</h1>
                <TextField className={classes.input} id="outlined-basic" label="Username" variant="outlined" onChange={(event)=> setUsername(event.target.value)} error={errorReg ? true : false} />
                <TextField className={classes.input} id="outlined-basic" label="Email" variant="outlined" onChange={(event)=> setEmail(event.target.value)} error={errorReg ? true : false} />
                <FormControl variant="outlined" className={classes.input}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={visible1 ? "text" : "password"}
                        onChange={(event)=> setPassword(event.target.value)}
                        error={errorReg ? true : false}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={() => setVisible1(!visible1)}
                                >
                                    {visible1 ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <FormControl variant="outlined" className={classes.input}>
                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={visible2 ? "text" : "password"}
                        onChange={(event)=> setConfpassword(event.target.value)}
                        error={errorReg ? true : false}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={() => setVisible2(!visible2)}
                                >
                                    {visible2 ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <Typography>{errorReg ? errorReg : ''}</Typography>
                <Button className={classes.button} variant="contained" color="primary" onClick={handleRegister}>
                    Register
                </Button>
            </Paper>
        </div>
    )
}
const useStyles = makeStyles(()=> ({
    root: {
        backgroundColor: 'pink',
        width: '100vw',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10vh'
    },
    container: {
        backgroundColor: '#ffffff',
        width: '40vw',
        height: '80vh',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        margin: '0 5%'
    },
    text: {
        textAlign: 'center'
    },
    input: {
        margin: 10
    },
    button: {
        margin: 10
    }
}

))
export default Register