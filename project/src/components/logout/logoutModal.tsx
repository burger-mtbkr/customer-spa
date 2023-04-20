import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { sessionUtil } from '../../utils';
import { logoutRequest } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { logoutModalOpen } from '../../selectors';
import { setLogoutModalOpenAction } from '../../actions';

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
  );
};

export default LogoutModal;
