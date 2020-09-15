import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Drawer, IconButton, List, Divider, ListItem, ListItemText, ListItemIcon} from "@material-ui/core"
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from "@material-ui/icons/Menu"


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

  const categories = ["Meja", "Sofa", "Kursi", "Lemari"]

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
          <ListItem button key={text}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={<Link>{text}</Link>} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
        <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer("top", true)} color="inherit" aria-label="menu">
            <MenuIcon />
        </IconButton>
          <Drawer anchor={"top"} open={state["top"]} onClose={toggleDrawer("top", false)}>
            {list("top")}
          </Drawer>
    </div>
  );
}