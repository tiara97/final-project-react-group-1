import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar}  from "@material-ui/core"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';

// import component
import TemporaryDrawer from "./drawer"

// import action
import {userLogout, getProfile} from "../action"
import { URL_IMG } from '../action/helper'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: "#fff",
      cursor: "pointer"
    },
  }));

const Navbar = () =>{
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles()
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getProfile())
    }, [])
    const { profile, username } = useSelector((state) => {
        return {
            profile: state.profileReducer.profile,
            username: state.userReducer.username
        }
    })
    const handleOpen = (event) =>{
        setAnchorEl(event.currentTarget)
    }

    const handleClose = ()=>{
        setAnchorEl(null)
    }
    const handleLogout=()=>{
        dispatch(userLogout())
        setAnchorEl(null)
    }
    if(profile[0]) {
        console.log(profile[0].image)
    }
    
    return(
        <div className={classes.root}>
            <AppBar position="fixed">
            <Toolbar>
                <TemporaryDrawer/>
                
                <Link to="/" className={classes.title}>
                    <Typography variant="h6" >
                        Furniture
                    </Typography>
                </Link>
                <div>
                    <IconButton
                        aria-controls="account-menu"
                        onClick={handleOpen}
                        color="inherit">
                        {profile[0] ? (
                            <Avatar src={URL_IMG + profile[0].image} />
                        ) : (
                            <Avatar>{username.charAt(0)}</Avatar>
                        )}
                        
                    </IconButton>
                    <Menu
                        id="account-menu"
                        anchorEl={anchorEl}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        open={open}
                        onClose={handleClose}>
                        {localStorage.getItem("id")?( 
                            <div>
                                <Link to="/Akun">
                                    <MenuItem>Akun</MenuItem>
                                </Link>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                
                            </div>):( 
                            <div>
                                <Link to="/Login">
                                    <MenuItem>Masuk</MenuItem>
                                </Link>
                                <Link to="/Register">
                                    <MenuItem>Daftar</MenuItem>
                                </Link>
                            </div>                           
                            )}
                       
                    </Menu>
                    <IconButton
                        color="inherit">
                        <SearchIcon/>
                    </IconButton>
                    <Link to="/Cart">
                        <IconButton
                            color="inherit">
                            <ShoppingCartIcon/>
                        </IconButton>
                    </Link>
                </div>
            </Toolbar>
            </AppBar>
      </div>
    )
}


export default Navbar