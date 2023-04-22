import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuDrawer from './menuDrawer';
import burgerIcon from '../../assets/common/icon_64.png';
import { makeStyles } from '@material-ui/core/styles';

import LogoutModal from '../logout/logoutModal';

import UserMenu from './userMenu';
import { useDispatch, useSelector } from 'react-redux';
import { loggedIn } from '../../selectors';
import { setAppDrawerOpenAction } from '../../actions';
import { CUSTOMER_LIST } from '../../routes/paths';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

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

  const toggleDrawer = (e: any) => {
    dispatch(setAppDrawerOpenAction(true));
  };
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
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <img src={burgerIcon} alt="logo" width={48} height={48} />
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
