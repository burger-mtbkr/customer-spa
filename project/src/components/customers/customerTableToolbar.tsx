import { useHistory } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import DeletePromptModal from './deletePromptModal';
import { getSelectedCustomers } from '../../selectors';
import { CustomerMenuButtons } from './customerMenuButton';

const CustomerTableToolbar = () => {
  const selectedCustomers = useSelector(getSelectedCustomers);
  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 2, sm: 2 },
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

        <CustomerMenuButtons />
      </Toolbar>
      <DeletePromptModal />
    </>
  );
};

export default CustomerTableToolbar;
