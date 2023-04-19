import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { storageUtil } from '../../utils';
import { Link, useHistory, useLocation } from 'react-router-dom';
import MenuDrawer from './menuDrawer';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { sessionUtil } from '../../utils';
import burgerIcon from '../../assets/common/icon_64.png';
import { makeStyles } from '@material-ui/core/styles';
import { logoutRequest } from '../../api';

const headerStyle = makeStyles(theme => ({
  appBar: {
    color: theme.palette.primary.dark,
  },
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(10),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign: 'left',
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
  titleLink: {
    color: '#000',
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
  themeSwitch: {
    color: '#000',
  },
}));

const HeaderBar = (): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  const classes = headerStyle();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const profileOpen = Boolean(anchorEl);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [auth, setAuth] = useState(() => {
    const t = storageUtil.getString('t');
    return t ? true : false;
  });

  useEffect(() => {
    const t = storageUtil.getString('t');
    t ? setAuth(true) : setAuth(false);
  }, [location]);

  const toggleDrawer = (e: any) => {
    if (auth) {
      setMenuOpen(true);
    } else {
      setMenuOpen(false);
    }
  };

  const onMenuClose = () => {
    setMenuOpen(false);
  };

  const handleMenu = (event: any): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };
  const openDeletePrompt = () => {
    handleClose();
    setOpen(true);
  };

  const closeDeletePrompt = () => {
    handleClose();
    setOpen(false);
  };

  const doLogout = async (e: any) => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error(`Logout: ${error}`);
    } finally {
      setOpen(false);
      sessionUtil.deleteSessionInfo();
      history.replace('/login');
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {auth && (
            <IconButton
              onClick={toggleDrawer}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <img src={burgerIcon} alt="logo" width={48} height={48} />
          <Typography variant="h5" className={classes.title}>
            Customer Leads CRM
          </Typography>
          {auth && (
            <div>
              <IconButton
                title="Account"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={profileOpen}
                onClose={handleClose}
              >
                <Link to="/userSettings" className={classes.menuLink}>
                  <MenuItem onClick={handleClose}>User Settings</MenuItem>
                </Link>
                <MenuItem className={classes.menuLink} onClick={openDeletePrompt}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {menuOpen && <MenuDrawer onMenuClose={onMenuClose} />}
      <Dialog
        open={open}
        onClose={closeDeletePrompt}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Logout?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={doLogout} color="primary">
            Yes, logout
          </Button>
          <Button onClick={closeDeletePrompt} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HeaderBar;
