import { Alert, Grid, } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { deleteCustomerAction, setDeleteModalOpenAction } from '../../actions';
import {
  getDeleteCustomerResponse,
  getDeleteModalOpen,
  getSelectedCustomers,
} from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { Button } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#FFF',
  border: '2px solid #FF0000',
  boxShadow: 24,
  p: 4,
};

const DeletePromptModal = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const isOpen = useSelector(getDeleteModalOpen);
  const selectedCustomers = useSelector(getSelectedCustomers);
  const deleteResponse = useSelector(getDeleteCustomerResponse);
  const [error, setError] = useState<string | Error | undefined>();

  const onDeleteCustomers = () => {
    const { id } = selectedCustomers[0];
    if (id) {
      dispatch(deleteCustomerAction(id));
    }
  };

  const handleClose = () => {
    dispatch(setDeleteModalOpenAction(false));
  };

  useEffect(() => {
    if (deleteResponse?.error) {
      setError('Logout failed');
    } else {
      dispatch(setDeleteModalOpenAction(false));
    }
  }, [deleteResponse, dispatch]);

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid marginBottom={2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <FormattedMessage id={'CUSTOMER_DELETE_TITLE'} defaultMessage={'Delete customer?'} />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormattedMessage
              id={'CUSTOMER_DELETE_MESSAGE_LINE_ONE'}
              defaultMessage={
                'Are you sure you wish to delete the selected customer and their related leads?'
              }
            />
          </Typography>
          <Typography style={{ color: 'red' }}>
            <FormattedMessage
              id={'CUSTOMER_DELETE_MESSAGE_LINE_TWO'}
              defaultMessage={'This cannot be undone.'}
            />
          </Typography>
        </Grid>
        <Grid marginBottom={2} spacing={2}>
          <Button
            style={{
              border: '1px solid #FF0000',
              marginRight: '2em',
            }}
            variant="outlined"
            onClick={onDeleteCustomers}
            aria-label={intl.formatMessage({
              id: 'BUTTON_DELETE',
              defaultMessage: 'Delete',
            })}
          >
            <FormattedMessage id={'BUTTON_DELETE'} defaultMessage={'Delete'} />
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
            aria-label={intl.formatMessage({
              id: 'BUTTON_CANCEL',
              defaultMessage: 'Cancel',
            })}
          >
            <FormattedMessage id={'BUTTON_CANCEL'} defaultMessage={'Cancel'} />
          </Button>
        </Grid>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Modal>
  );
};

export default DeletePromptModal;
