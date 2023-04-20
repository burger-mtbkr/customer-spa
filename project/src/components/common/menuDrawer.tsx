import React from 'react';
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
  listItem: {
    color: theme.palette.primary.main,
  },
  iconColor: {
    color: theme.palette.primary.main,
  },
  listTitle: {
    color: theme.palette.primary.main,
    textAlign: 'center',
    paddingTop: '5px',
    textDecoration: 'underline',
  },
}));

export interface IMenuDrawerProps {
  onMenuClose(): void;
}

const MenuDrawer = (props: IMenuDrawerProps) => {
  const { onMenuClose } = props;
  const classes = drawerStyle();
  const [state, setState] = React.useState({
    left: true,
  });

  const toggleDrawer = (menuState: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, left: menuState });

    if (!menuState) onMenuClose();
  };

  return (
    <Drawer open={state.left} onClose={toggleDrawer(false)}>
      <div
        className={classes.drawer}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
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
  );
};
export default MenuDrawer;
