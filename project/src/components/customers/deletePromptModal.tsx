import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { SxProps, Theme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomerAction, setDeleteModalOpenAction } from '../../actions';
import { useEffect } from 'react';
import {
  getDeleteCustomerResponse,
  getSelectedCustomers,
  getDeleteModalOpen,
} from '../../selectors';

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
            Delete customers?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you wish to delete the selected customer and their related leads?
          </Typography>
          <Typography style={{ color: 'red' }}>This cannot be undone.</Typography>
          <Button onClick={onDeleteCustomers}>Delete</Button>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DeletePromptModal;
