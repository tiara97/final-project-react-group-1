import React from 'react'
import { TextField, 
        Button, 
        Paper, 
        IconButton, 
        OutlinedInput, 
        InputAdornment, 
        FormControl, 
        InputLabel, 
        makeStyles, 
        Typography, 
        Backdrop,
        CircularProgress
         } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useSelector, useDispatch } from "react-redux"
import { Redirect, Link } from "react-router-dom"

// import action
import { userLogin, getProfile } from '../action'

const Login = () => {
    // declare className
    const classes = useStyles()

    // login state
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [visible, setVisible] = React.useState(false);

    // get data from reducer
    const { id, errorLogin, loading } = useSelector(state => {
        return {
            id: state.userReducer.id,
            errorLogin: state.userReducer.errorLogin,
            loading: state.userReducer.loadingLogin
        }
    })
    // invoke action
    const dispatch = useDispatch()
    const handleLogin = () => {
        const body = { username, password }
        console.log(body)
        dispatch(userLogin(body))
    }
    
    if (id) {
        return <Redirect to='/' />
    }
    return (
        <div className={classes.root}>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress/>
            </Backdrop>
            <Paper className={classes.container} elevation={5}>
                <h1 className={classes.text}>Login</h1>
                <TextField className={classes.input} id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    onChange={(event) => setUsername(event.target.value)}
                    error={errorLogin ? true : false} />
                <FormControl variant="outlined" className={classes.input}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={visible ? "text" : "password"}
                        onChange={(event) => setPassword(event.target.value)}
                        error={errorLogin ? true : false}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={() => setVisible(!visible)}
                                >
                                    {visible ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <Typography className={classes.error}>{errorLogin ? errorLogin : ''}</Typography>
                <Button variant="contained" color="primary" className={classes.button} onClick={handleLogin}>
                    Login
                </Button>
                <Link to='/Register'>
                <Button className={classes.button} variant="outlined" color="primary">
                    Register
                </Button>
                </Link>
            </Paper>
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
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
export default Login