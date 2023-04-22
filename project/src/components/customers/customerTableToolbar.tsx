import { CustomerMenuButtons } from './customerMenuButton';
import DeletePromptModal from './deletePromptModal';
import { FormattedMessage } from 'react-intl';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { getSelectedCustomers } from '../../selectors';
import { useSelector } from 'react-redux';

const CustomerTableToolbar = () => {
  const selectedCustomers = useSelector(getSelectedCustomers);

  const selectedTitle =
    selectedCustomers.length === 1
      ? `${selectedCustomers.length} customer selected`
      : `${selectedCustomers.length} customers selected`;

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
            {selectedTitle}
          </Typography>
        ) : (
          <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
            <FormattedMessage id="CUSTOMER_LIST_TITLE" defaultMessage="Customers" />
          </Typography>
        )}

        <CustomerMenuButtons />
      </Toolbar>
      <DeletePromptModal />
    </>
  );
};

export default CustomerTableToolbar;
