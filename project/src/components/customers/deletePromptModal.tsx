import { SxProps, Theme } from '@mui/material';
import { deleteCustomerAction, setDeleteModalOpenAction } from '../../actions';
import {
  getDeleteCustomerResponse,
  getDeleteModalOpen,
  getSelectedCustomers,
} from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormattedMessage } from 'react-intl';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

const style: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#FFF',
  border: '2px solid #114ebd',
  boxShadow: 24,
  p: 4,
};

const DeletePromptModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(getDeleteModalOpen);
  const selectedCustomers = useSelector(getSelectedCustomers);
  const deleteResponse = useSelector(getDeleteCustomerResponse);

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
    if (deleteResponse?.isSuccessful === true) {
      dispatch(setDeleteModalOpenAction(false));
    } else if (deleteResponse?.isSuccessful === false) {
      alert(`Failed to delete`);
    }
  }, [deleteResponse, dispatch]);

  return (
    <div>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
          <Button onClick={onDeleteCustomers}>
            <FormattedMessage id={'BUTTON_DELETE'} defaultMessage={'Delete'} />
          </Button>
          <Button onClick={handleClose}>
            <FormattedMessage id={'BUTTON_CANCEL'} defaultMessage={'Cancel'} />
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DeletePromptModal;
