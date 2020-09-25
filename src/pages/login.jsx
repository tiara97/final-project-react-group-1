import React from 'react'
import {
    TextField,
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
                <CircularProgress />
            </Backdrop>
            <div className={classes.img}>
                <img width="100%" src='https://img2.pngio.com/modern-sofa-images-png-transparent-png-kindpng-modern-furniture-png-860_517.png' />
            </div>
            <Paper className={classes.container} elevation={5}>
                <Typography variant='h3' className={classes.text}>Login</Typography>
                <TextField className={classes.input} id="outlined-basic"
                    value={username}
                    label="Username"
                    variant="outlined"
                    onChange={(event) => setUsername(event.target.value)}
                    error={errorLogin ? true : false} />
                <TextField className={classes.input} id="outlined-basic" label="Password" variant="outlined" onChange={(event) => setPassword(event.target.value)} error={errorLogin ? true : false} value={password} type={visible ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={() => setVisible(!visible)}
                                >
                                    {visible ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }} />
                <Typography className={classes.error}>{errorLogin ? errorLogin : ''}</Typography>
                <Button variant="contained" color="primary" className={classes.button} onClick={handleLogin}>
                    Login
                </Button>
                <Button className={classes.button} variant="outlined" color="primary" component={Link} to='/Register'>
                    Register
                </Button>
            </Paper>
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
    // * : {
    //     margin: 0,
    //     padding: 0,
    //     box-sizing: 'border-box',
    // },
    root: {
        backgroundColor: '#f7f7f7',
        width: '100vw',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10vh',
        margin : 0,
        // backgroundImage : 'url(https://img2.pngio.com/modern-sofa-images-png-transparent-png-kindpng-modern-furniture-png-860_517.png)',
        // backgroundRepeat : 'no-repeat',
        // backgroundSize : 'cover',
    },
    container: {
        backgroundColor: '#f2f2f2',
        // position: 'absolute',
        // zIndex: 2,
        width: '30vw',
        height: '60vh',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        // margin: '0 2%'
    },
    img: {
        height: 'auto',
        width: 400,
        // marginRight: 20
        // position: 'absolute',
        // zIndex: 2,
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