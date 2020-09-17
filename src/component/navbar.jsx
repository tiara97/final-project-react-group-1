import React from "react"
import {Link} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem}  from "@material-ui/core"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';


import TemporaryDrawer from "./drawer"

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

    const handleOpen = (event) =>{
        setAnchorEl(event.currentTarget)
    }

    const handleClose = ()=>{
        setAnchorEl(null)
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
                        <AccountCircleIcon/>
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
                        <MenuItem>Login</MenuItem>
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