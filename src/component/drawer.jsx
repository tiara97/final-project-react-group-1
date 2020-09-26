import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import CategoryIcon from '@material-ui/icons/Category';
import KitchenIcon from '@material-ui/icons/Kitchen';


const useStyles = makeStyles((theme)=>({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  listMenu:{
      display: "flex",
      flexDirection: "column"
  },
  link:{
    textDecoration: "none",
    color: "#000"
  },
  drawer:{
    backgroundColor: "rgba(149, 165, 166,0.1)"
  }
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const categories = ["Produk", "Kategori"]

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className={classes.listMenu}>
        {categories.map((text, index) => (
          <Link to={`/${text}`} className={classes.link} key={index}>
            <ListItem button>
              <ListItemIcon>{index === 1 ? <CategoryIcon/> : <KitchenIcon/>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div>
        <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer("left", true)} color="inherit" aria-label="menu">
            <MenuIcon />
        </IconButton>
          <Drawer 
            anchor={"left"} 
            open={state["left"]} 
            onClose={toggleDrawer("left", false)}
            className={classes.drawer}
            >
            {list("left")}
          </Drawer>
    </div>
  );
}