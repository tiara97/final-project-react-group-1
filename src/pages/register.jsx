import React from 'react'
import { TextField, Button, Paper, IconButton, OutlinedInput, InputAdornment, FormControl, InputLabel, makeStyles, Typography, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Backdrop, CircularProgress } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useSelector, useDispatch } from "react-redux"
import { Redirect, Link } from "react-router-dom"

// import action
import { userRegister } from '../action'

const AlertDialog = (props) => {
    const { title, open, close } = props
    return (
        <div>
            <Dialog
                open={open}
                onClose={close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Untuk menyelesaikan proses registrasi, silahkan cek email Anda untuk memverifikasi akun yang sudah dibuat. Selamat berbelanja!
            </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="primary" autoFocus>
                        OK
            </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const Register = () => {
    // declare className
    const classes = useStyles()

    // dialog state
    const [open, setOpen] = React.useState(false);

    // register state
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confPassword, setConfpassword] = React.useState('');
    const [visible1, setVisible1] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    const [user_fullname, setFullname] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [province, setProvince] = React.useState('');
    const [postcode, setPostcode] = React.useState('');

    // get data from reducer
    const { id, errorReg, loading } = useSelector(state => {
        return {
            id: state.userReducer.id,
            // nampilin eror jg masalah, krn dia nampilin eror yg pertama terjadi aja
            errorReg: state.userReducer.errorReg,
            loading: state.userReducer.loadingReg
        }
    })
    const dispatch = useDispatch()
    
    const handleLoc = () => {
        const successCB = (position) => {
            console.log(position)
            let lat = position.coords.latitude
            let long = position.coords.longitude
            handleRegister(lat, long)
        }
        const errorCB = (error) => {
            console.log(error)
        }
        navigator.geolocation.getCurrentPosition(successCB, errorCB)
    }
    const handleRegister = (lat,long) => {
        const body = { username, password, confPassword, email, user_fullname, phone, address, city, province, postcode, latitude: lat, longitude: long }
        console.log(body)
        dispatch(userRegister(body))
        // setOpen(true)
        // setUsername('')
        // setEmail('')
        // setPassword('')
        // setConfpassword('')
        // ini masih masalah, kapan buka modalnya ???
        if (errorReg !== '') {
            setOpen(true)
        }
    }

    if (id) {
        if(open === false) {
            return <Redirect to='/' />
        }
    }
    return (
        <div className={classes.root}>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress/>
            </Backdrop>
            <Paper className={classes.container} elevation={5}>
                <Typography variant='h6' className={classes.titleCont}>
                    <h1 className={classes.title}>Register</h1>
                </Typography>
                <div className={classes.inputCont}>
                    <div className={classes.divLeft}>
                        <Typography variant='h6' className={classes.text}>Info Akun</Typography>
                        <TextField className={classes.input} id="outlined-basic" label="Username" variant="outlined" onChange={(event) => setUsername(event.target.value)} error={errorReg ? true : false} size='small' />
                        <TextField className={classes.input} id="outlined-basic" label="Email" variant="outlined" onChange={(event) => setEmail(event.target.value)} error={errorReg ? true : false} size='small' />
                        <TextField className={classes.input} id="outlined-basic" label="Password" variant="outlined" onChange={(event) => setPassword(event.target.value)} error={errorReg ? true : false} size='small' type={visible1 ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                            onClick={() => setVisible1(!visible1)}
                                        >
                                            {visible1 ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }} />
                        <TextField className={classes.input} id="outlined-basic" label="Confirm Password" variant="outlined" onChange={(event) => setConfpassword(event.target.value)} error={errorReg ? true : false} size='small' type={visible2 ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                            onClick={() => setVisible2(!visible2)}
                                        >
                                            {visible2 ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }} />
                    </div>
                    <div className={classes.divRight}>
                        <Typography variant='h6' className={classes.text}>Info Personal</Typography>
                        <TextField className={classes.input} id="outlined-basic" label="Nama" variant="outlined" onChange={(event) => setFullname(event.target.value)} error={errorReg ? true : false} size='small' />
                        <TextField className={classes.input} id="outlined-basic" label="Nomor Handphone" variant="outlined" onChange={(event) => setPhone(event.target.value)} error={errorReg ? true : false} size='small' />
                        <TextField className={classes.input} id="outlined-basic" label="Alamat" variant="outlined" onChange={(event) => setAddress(event.target.value)} error={errorReg ? true : false} size='small' />
                        <TextField className={classes.input} id="outlined-basic" label="Kota" variant="outlined" onChange={(event) => setCity(event.target.value)} error={errorReg ? true : false} size='small' />
                        <div className={classes.address}>
                            <TextField className={classes.input} id="outlined-basic" label="Provinsi" variant="outlined" onChange={(event) => setProvince(event.target.value)} error={errorReg ? true : false} size='small' />
                            <TextField className={classes.input} id="outlined-basic" label="Kodepos" variant="outlined" onChange={(event) => setPostcode(event.target.value)} error={errorReg ? true : false} size='small' />
                        </div>
                    </div>
                </div>
                <Typography className={classes.error}> {errorReg ? errorReg : ''}</Typography>
                {/* <Typography className={classes.error}> {errorReg ? `${errorReg.join(', ')}` : ''}</Typography> */}
                <Button className={classes.button} variant="contained" color="primary" onClick={handleLoc}>
                    Register
                </Button>
                    <Button className={classes.button} component={Link} to='/Login' variant="outlined" color="primary">
                        Login
                </Button>
            </Paper>
            <AlertDialog open={open} title={`Welcome! :)`} close={() => setOpen(false)} />
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#f7f7f7',
        width: '100vw',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10vh'
    },
    container: {
        backgroundColor: '#ffffff',
        width: '60vw',
        height: 'auto',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        // margin: '0 5%'
        // marginTop: '15vh'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
    divLeft: {
        borderRight: '1px solid black',
        flex: 2,
        padding: 10,
        display: 'flex',
        flexDirection: 'column'
    },
    divRight: {
        padding: 10,
        flex: 3,
        display: 'flex',
        flexDirection: 'column'
    },
    inputCont: {
        display: 'flex'
    },
    titleCont: {
        padding: 5
    },
    title: {
        textAlign: 'center',
        margin: 0
    },
    text: {
        margin: 0,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        fontSize: 12,
        margin: '0 10px'
    },
    input: {
        marginBottom: 10,
    },
    address: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        margin: 10,
    }
}

))
export default Register