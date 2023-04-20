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

const headerStyle = makeStyles(theme => ({
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
          <Typography variant="h5" className={classes.title}>
            Customer Leads CRM
          </Typography>
          <UserMenu />
        </Toolbar>
      </AppBar>
      <MenuDrawer />
      <LogoutModal />
    </div>
  );
};

export default HeaderBar;
