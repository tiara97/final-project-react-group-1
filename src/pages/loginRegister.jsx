import React from 'react'
import { TextField, Button, Paper, IconButton, OutlinedInput, InputAdornment, FormControl, InputLabel, makeStyles, Typography } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {useSelector, useDispatch} from "react-redux"
import {Link, Redirect, useHistory} from "react-router-dom"

// import action
import {userLogin, userRegister} from '../action'

const LoginRegister = () => {
    // declare className
    const classes = useStyles()
    const history = useHistory()

    // login state
    const [usernameL, setUsernameL] = React.useState('');
    const [passwordL, setPasswordL] = React.useState('');
    const [visibleL, setVisibleL] = React.useState(false);

    // register state
    const [usernameR, setUsernameR] = React.useState('');
    const [emailR, setEmailR] = React.useState('');
    const [passwordR, setPasswordR] = React.useState('');
    const [confpasswordR, setConfpasswordR] = React.useState('');
    const [visible1R, setVisible1R] = React.useState(false);
    const [visible2R, setVisible2R] = React.useState(false);

    // get data from reducer
    const {id, errorLogin, errorReg} = useSelector(state => {
        return {
            id: state.userReducer.id,
            errorLogin: state.userReducer.errorLogin,
            errorReg: state.userReducer.errorReg
        }
    })
    // invoke action
    const dispatch = useDispatch()
    const handleLogin = async() => {
        let username = usernameL
        let password = passwordL
        const body = {username, password}
        console.log(body)
        await dispatch(userLogin(body))
        setUsernameL('')
        setPasswordL('')
        console.log(id)
        if(id) {history.push('/'); console.log('jjj')}
        // ERROR-ini baru jalan pas pencet tombol kedua kali, krn id awalnya null. redirect to home ????
    }
    const handleRegister = () => {
        let username = usernameR
        let email = emailR
        let password = passwordR
        let confPassword = confpasswordR
        const body = {username, password, confPassword, email}
        console.log(body)
        dispatch(userRegister(body))
        setUsernameR('')
        setEmailR('')
        setPasswordR('')
        setConfpasswordR('')
    }

    // React.useEffect(()=> {
    //     if(id) {
    //         return <Redirect to='/' />
    //     }
    // })
    return (
        <div className={classes.root}>
            {/* login component */}
            <Paper className={classes.container} elevation={5}>
            <h1 className={classes.text}>Login</h1>
                <TextField className={classes.input} id="outlined-basic" 
                label="Username" 
                variant="outlined" 
                onChange={(event)=> setUsernameL(event.target.value)}
                error={errorLogin ? true : false} />
                <FormControl variant="outlined" className={classes.input}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={visibleL ? "text" : "password"}
                            onChange={(event)=> setPasswordL(event.target.value)}
                            error={errorLogin ? true : false}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                        onClick={() => setVisibleL(!visibleL)}
                                    >
                                        { visibleL ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                            
                        />
                    </FormControl>
                <Typography className={classes.error}>{errorLogin? errorLogin : ''}</Typography>
                <Button variant="contained" color="primary" className={classes.button} onClick={handleLogin}>
                    Login
                </Button>
            </Paper>

            {/* register component */}
            <Paper className={classes.container} elevation={5}>
                <h1 className={classes.text}>Register Page</h1>
                <TextField className={classes.input} id="outlined-basic" label="Username" variant="outlined" onChange={(event)=> setUsernameR(event.target.value)} error={errorReg ? true : false} />
                <TextField className={classes.input} id="outlined-basic" label="Email" variant="outlined" onChange={(event)=> setEmailR(event.target.value)} error={errorReg ? true : false} />
                <FormControl variant="outlined" className={classes.input}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={visible1R ? "text" : "password"}
                        onChange={(event)=> setPasswordR(event.target.value)}
                        error={errorReg ? true : false}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={() => setVisible1R(!visible1R)}
                                >
                                    {visible1R ? <Visibility /> : <VisibilityOff />}
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
                        type={visible2R ? "text" : "password"}
                        onChange={(event)=> setConfpasswordR(event.target.value)}
                        error={errorReg ? true : false}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={() => setVisible2R(!visible2R)}
                                >
                                    {visible2R ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <Typography className={classes.error}>{errorReg? errorReg : ''}</Typography>
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
        height: '70vh',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        margin: '0 5%'
    },
    text: {
        textAlign: 'center'
    },
    error: {
        color: 'red',
        fontSize: 12,
        margin: '0 10px'
    },
    input: {
        margin: 10
    },
    button: {
        margin: 10
    }
}

))
export default LoginRegister