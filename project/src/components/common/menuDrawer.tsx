import React, { useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinkIcon from '@material-ui/icons/Link';
import PeopleSharp from '@material-ui/icons/PeopleSharp';
import { Link } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setAppDrawerOpenAction } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { appDrawerOpen, loggedIn } from '../../selectors';

const drawerStyle = makeStyles(theme => ({
  drawer: {
    width: 240,
  },
  menuLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    display: 'block',
    '&:focus': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '& $primary, & $icon': {
        color: theme.palette.primary.light,
      },
    },
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '& $primary, & $icon': {
        color: theme.palette.primary.light,
      },
    },
  },
  iconColor: {
    color: theme.palette.primary.main,
  },
}));

const MenuDrawer = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(loggedIn);
  const isAppDrawerOpen = useSelector(appDrawerOpen);
  const classes = drawerStyle();
  const [state, setState] = React.useState({
    left: true,
  });

  useEffect(() => {
    if (isAppDrawerOpen) setState({ ...state, left: true });
  }, [isAppDrawerOpen, state]);

  const closeAppDrawer = () => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, left: false });

    dispatch(setAppDrawerOpenAction(false));
  };

  return isLoggedIn && isAppDrawerOpen ? (
    <Drawer open={state.left} onClose={closeAppDrawer()}>
      <div
        className={classes.drawer}
        role="presentation"
        onClick={closeAppDrawer()}
        onKeyDown={closeAppDrawer()}
      >
        <List aria-labelledby="list-subheader">
          <ListItem button>
            <ListItemIcon>
              <PeopleSharp className={classes.iconColor} />
            </ListItemIcon>
            <Link to="/customers" className={classes.menuLink}>
              <ListItemText>Customers</ListItemText>
            </Link>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <LinkIcon className={classes.iconColor} />
            </ListItemIcon>
            <a
              href="https://github.com/burger-mtbkr/customer-spa"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.menuLink}
            >
              <ListItemText>Github</ListItemText>
            </a>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LinkIcon className={classes.iconColor} />
            </ListItemIcon>
            <a
              href="https://stackoverflow.com/users/3150426/tresponse"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.menuLink}
            >
              <ListItemText>Stack Overflow</ListItemText>
            </a>
          </ListItem>
        </List>
      </div>
    </Drawer>
  ) : null;
};
export default MenuDrawer;
