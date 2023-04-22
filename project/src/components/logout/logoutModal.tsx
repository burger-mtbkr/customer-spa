import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { logoutModalOpen } from '../../selectors';
import { logoutRequest } from '../../api';
import { sessionUtil } from '../../utils';
import { setLogoutModalOpenAction } from '../../actions';
import { useHistory } from 'react-router-dom';

const LogoutModal = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const open = useSelector(logoutModalOpen);

  const closeDeletePrompt = () => {
    dispatch(setLogoutModalOpenAction(false));
  };

  const doLogout = async (e: any) => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error(`Logout: ${error}`);
    } finally {
      closeDeletePrompt();
      sessionUtil.deleteSessionInfo();
      history.replace('/login');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={closeDeletePrompt}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Logout?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <FormattedMessage
            id={'USER_LOGOUT_MESSAGE'}
            defaultMessage={'Are you sure you want to logout?'}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={doLogout} color="primary">
          <FormattedMessage id={'BUTTON_LOGOUT'} defaultMessage={'Logout'} />
        </Button>
        <Button onClick={closeDeletePrompt} color="primary" autoFocus>
          <FormattedMessage id={'BUTTON_CANCEL'} defaultMessage={'Cancel'} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
