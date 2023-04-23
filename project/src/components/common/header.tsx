import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import { CUSTOMER_LIST } from '../../routes/paths';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import LogoutModal from '../logout/logoutModal';
import MenuDrawer from './menuDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UserMenu from './userMenu';
import { loggedIn } from '../../selectors';
import logoIcon from '../../assets/common/logo.svg';
import { makeStyles } from '@material-ui/core/styles';
import { setAppDrawerOpenAction } from '../../actions';

const headerStyle = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(10),
  },
  menuLink: {
    color: '#FFF',
    textDecoration: 'none',
    display: 'block',
    '&:focus': {
      color: '#FFF',
      textDecoration: 'none',
      '& $primary, & $icon': {
        color: '#FFF',
      },
    },
    '&:hover': {
      color: '#FFF',
      textDecoration: 'underline',
      '& $primary, & $icon': {
        color: '#FFF',
      },
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign: 'left',
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
}));

const HeaderBar = (): JSX.Element => {
  const dispatch = useDispatch();
  const classes = headerStyle();
  const isLoggedIn = useSelector(loggedIn);
  const intl = useIntl();

  const toggleDrawer = (e: any) => {
    dispatch(setAppDrawerOpenAction(true));
  };

  const menuTitle = intl.formatMessage({
    id: 'USER_MENU_ICON_TITLE',
    defaultMessage: 'User menu',
  });

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {isLoggedIn && (
            <IconButton
              onClick={toggleDrawer}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              title={menuTitle}
              aria-label={menuTitle}
            >
              <MenuIcon />
            </IconButton>
          )}
          <img src={logoIcon} alt="logo" width={48} height={48} />
          <Link to={CUSTOMER_LIST} className={classes.menuLink}>
            <Typography variant="h5" className={classes.title}>
              <FormattedMessage id="APP_HEADER_TITLE" defaultMessage="Customer CRM" />
            </Typography>
          </Link>
          <UserMenu />
        </Toolbar>
      </AppBar>
      <MenuDrawer />
      <LogoutModal />
    </div>
  );
};

export default HeaderBar;
