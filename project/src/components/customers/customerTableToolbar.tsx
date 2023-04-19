import { useHistory } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import DeletePromptModal from './deletePromptModal';
import { getSelectedCustomers } from '../../selectors';
import { setDeleteModalOpenAction, setSelectedCustomersAction } from '../../actions';

const CustomerTableToolbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedCustomers = useSelector(getSelectedCustomers);

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selectedCustomers.length > 0 && {
            bgcolor: (theme: {
              palette: { primary: { main: string }; action: { activatedOpacity: number } };
            }) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {selectedCustomers.length > 0 ? (
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
            {selectedCustomers.length} selected
          </Typography>
        ) : (
          <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
            Customers
          </Typography>
        )}

        {selectedCustomers.length === 1 && (
          <>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  history.push('/editcustomer');
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => dispatch(setDeleteModalOpenAction(true))}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
        <Tooltip title="Add">
          <IconButton
            onClick={() => {
              dispatch(setSelectedCustomersAction([]));
              history.push('/addcustomer');
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <DeletePromptModal />
    </>
  );
};

export default CustomerTableToolbar;
