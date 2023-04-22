import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { setLogoutModalOpenAction, setUserMenuOpenAction } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { loggedIn } from '../../selectors';
import { Typography } from '@material-ui/core';
import { FormattedMessage, useIntl } from 'react-intl';

const userMenuStyle = makeStyles(theme => ({
  iconButton: {
    position: 'absolute',
    right: theme.spacing(2),
  },
  title: {
    textAlign: 'left',
    flexGrow: 1,
    marginLeft: theme.spacing(1),
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
}));

const UserMenu = () => {
  const dispatch = useDispatch();
  const classes = userMenuStyle();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const profileOpen = Boolean(anchorEl);
  const isLoggedIn = useSelector(loggedIn);
  const intl = useIntl();

  const openUserMenu = (event: any): void => {
    setAnchorEl(event.currentTarget);
    dispatch(setUserMenuOpenAction(true));
  };

  const handleClose = (): void => {
    setAnchorEl(null);
    dispatch(setUserMenuOpenAction(false));
    dispatch(setLogoutModalOpenAction(false));
  };
  const openDeletePrompt = () => {
    handleClose();
    dispatch(setLogoutModalOpenAction(true));
  };

  return isLoggedIn ? (
    <>
      <IconButton
        className={classes.iconButton}
        title={intl.formatMessage({
          id: 'USER_MENU_ICON_TITLE',
          defaultMessage: 'User menu of current user',
        })}
        aria-label={intl.formatMessage({
          id: 'USER_MENU_ICON_TITLE',
          defaultMessage: 'User menu of current user',
        })}
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={openUserMenu}
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
        <Link to="/passwordChange" className={classes.menuLink}>
          <MenuItem onClick={handleClose}>
            <Typography gutterBottom variant="subtitle1">
              <FormattedMessage
                id={'CHANGE_PASSWORD_TITLE'}
                defaultMessage={'Change your password'}
              />
            </Typography>
          </MenuItem>
        </Link>
        <MenuItem className={classes.menuLink} onClick={openDeletePrompt}>
          <Typography gutterBottom variant="subtitle1">
            <FormattedMessage id={'BUTTON_LOGOUT'} defaultMessage={'Yes, logout'} />
          </Typography>
        </MenuItem>
      </Menu>
    </>
  ) : null;
};

export default UserMenu;
