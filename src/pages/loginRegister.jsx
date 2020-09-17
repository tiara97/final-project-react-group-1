import React from 'react'
import { TextField, Button, Paper, IconButton, OutlinedInput, InputAdornment, FormControl, InputLabel } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const LoginRegister = () => {
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

    const handleLogin = () => {
        console.log(usernameL, passwordL)
    }

    const handleRegister = () => {
        let user = usernameR
        let mail = emailR
        let pass = passwordR
        let confpass = confpasswordR
        console.log(user, mail, pass, confpass)
    }
    return (
        <div style={styles.root}>
            <Paper style={styles.container} elevation={5}>
            <h1 style={styles.text}>Login</h1>
                <TextField style={styles.input} id="outlined-basic" label="Username" variant="outlined" onChange={(event)=> setUsernameL(event.target.value)} />
                <FormControl variant="outlined" style={styles.input}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={visibleL ? "text" : "password"}
                            onChange={(event)=> setPasswordL(event.target.value)}
                            helpertext="Incorrect entry."
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
                <Button variant="contained" color="primary" style={styles.button} onClick={handleLogin}>
                    Login
                </Button>
            </Paper>

            <Paper style={styles.container} elevation={5}>
                <h1 style={styles.text}>Register Page</h1>
                <TextField style={styles.input} id="outlined-basic" label="Username" variant="outlined" onChange={(event)=> setUsernameR(event.target.value)} />
                <TextField style={styles.input} id="outlined-basic" label="Email" variant="outlined" onChange={(event)=> setEmailR(event.target.value)} />
                <TextField style={styles.input} id="outlined-basic" label="Email" variant="outlined"  />
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={visible1R ? "text" : "password"}
                        onChange={(event)=> setPasswordR(event.target.value)}
                        helpertext="Incorrect entry."
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
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={visible2R ? "text" : "password"}
                        onChange={(event)=> setConfpasswordR(event.target.value)}
                        helpertext="Incorrect entry."
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
                <Button style={styles.button} variant="contained" color="primary" onClick={handleRegister}>
                    Register
                </Button>
            </Paper>
        </div>
    )
}
const styles = {
    root: {
        backgroundColor: 'pink',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#ffffff',
        width: '40vw',
        height: '80vh',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
export default LoginRegister