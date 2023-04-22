import React, { useEffect } from 'react';
import { appDrawerOpen, loggedIn } from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { MenuLinks } from './menuLink';
import { makeStyles } from '@material-ui/core/styles';
import { setAppDrawerOpenAction } from '../../actions';

const drawerStyle = makeStyles(_ => ({
  drawer: {
    width: 240,
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
          <MenuLinks />
        </List>
      </div>
    </Drawer>
  ) : null;
};
export default MenuDrawer;
