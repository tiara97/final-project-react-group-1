import React from 'react'
import { TextField, Button, Paper, IconButton, OutlinedInput, InputAdornment, FormControl, InputLabel, makeStyles, Typography, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useSelector, useDispatch } from "react-redux"
import { Redirect, Link } from "react-router-dom"

// import action
import { userRegister } from '../action'

const AlertDialog = (props) => {
    const {title, open, close} = props
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

    // get data from reducer
    const { id, errorReg } = useSelector(state => {
        return {
            id: state.userReducer.id,
            errorReg: state.userReducer.errorReg
        }
    })
    // invoke action
    const dispatch = useDispatch()
    const handleRegister = () => {
        const body = { username, password, confPassword, email }
        console.log(body)
        dispatch(userRegister(body))
        setUsername('')
        setEmail('')
        setPassword('')
        setConfpassword('')
        setOpen(true)
    }

    if (id && open === false) {
        return <Redirect to='/' />
    }
    return (
        <div className={classes.root}>
            <Paper className={classes.container} elevation={5}>
                <h1 className={classes.text}>Register Page</h1>
                <TextField className={classes.input} id="outlined-basic" label="Username" variant="outlined" onChange={(event) => setUsername(event.target.value)} error={errorReg ? true : false} />
                <TextField className={classes.input} id="outlined-basic" label="Email" variant="outlined" onChange={(event) => setEmail(event.target.value)} error={errorReg ? true : false} />
                <FormControl variant="outlined" className={classes.input}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={visible1 ? "text" : "password"}
                        onChange={(event) => setPassword(event.target.value)}
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
                        onChange={(event) => setConfpassword(event.target.value)}
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
                <Typography className={classes.error}>{errorReg ? errorReg : ''}</Typography>
                <Button className={classes.button} variant="contained" color="primary" onClick={handleRegister}>
                    Register
                </Button>
                <Link to='/Login'>
                <Button className={classes.button} variant="outlined" color="primary">
                    Login
                </Button>
                </Link>
            </Paper>
            <AlertDialog open={open} title={`Welcome! :)`} close={()=> setOpen(false)} />
        </div>
    )
}
const useStyles = makeStyles(() => ({
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
export default Register