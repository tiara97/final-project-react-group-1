import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar}  from "@material-ui/core"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListIcon from '@material-ui/icons/List';
import KitchenIcon from '@material-ui/icons/Kitchen';

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
    icon:{
        marginRight: 10
    },
    toolbar:{
        justifyContent: "space-between",
      
    },
    appbar:{
        backgroundColor: "rgba(149, 165, 166,0.5)"
    }
  }));

const Navbar = () =>{
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles()
    const dispatch = useDispatch()

    const { profile, username, role_id } = useSelector((state) => {
        return {
            profile: state.profileReducer.profile,
            username: state.userReducer.username,
            role_id: state.userReducer.role
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
    
    return(
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
                <div>
                    <TemporaryDrawer/>
                </div>
                
                <div>
                    <Link to="/" className={classes.title}>
                        <Typography variant="h6" >
                            Furniture
                        </Typography>
                    </Link>
                </div>
                <div>
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
                    <IconButton
                        aria-controls="account-menu"
                        onClick={handleOpen}
                        color="inherit">
                        {profile.image ? (
                            <Avatar src={URL_IMG + profile.image} />
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
                            role_id === 3?
                            (<div>
                                <Link to="/Akun">
                                    <MenuItem>
                                        <AccountCircleIcon className={classes.icon}/>
                                        Akun
                                    </MenuItem>
                                </Link>
                                <MenuItem onClick={handleLogout}>
                                    <ExitToAppIcon className={classes.icon}/>
                                    Logout
                                </MenuItem>
                                
                            </div>):(
                            <div>
                                <Link to="/Produk-Admin">
                                    <MenuItem>
                                        <KitchenIcon className={classes.icon}/>
                                        Produk
                                    </MenuItem>
                                </Link>
                                <Link to="/Order-Admin">
                                    <MenuItem>
                                        <ListIcon className={classes.icon}/>
                                        Order
                                    </MenuItem>
                                </Link>
                                <Link to="/Akun-Admin">
                                    <MenuItem>
                                        <AccountCircleIcon className={classes.icon}/>
                                        Akun
                                    </MenuItem>
                                </Link>
                                <MenuItem onClick={handleLogout}>
                                    <ExitToAppIcon className={classes.icon}/>
                                    Logout
                                </MenuItem>
                                
                            </div>
                            )):( 
                            <div>
                                <Link to="/Login">
                                    <MenuItem>
                                        <PersonIcon className={classes.icon}/>
                                         Masuk
                                    </MenuItem>
                                </Link>
                                <Link to="/Register">
                                    <MenuItem>
                                        <PersonAddIcon className={classes.icon}/>
                                        Daftar
                                    </MenuItem>
                                </Link>
                            </div>                           
                            )}
                       
                    </Menu>
                </div>
            </Toolbar>
            </AppBar>
      </div>
    )
}


export default Navbar