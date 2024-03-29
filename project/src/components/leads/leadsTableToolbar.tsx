import { FormattedMessage } from 'react-intl';
import { LeadsMenuButtons } from './leadsMenuButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { getEditCustomer } from '../../selectors';
import { getSelectedLead } from './../../selectors/leads.selectors';
import { selectionColor } from '../../theme';
import { useSelector } from 'react-redux';

const LeadsTableToolbar = () => {
  const selectedLead = useSelector(getSelectedLead);
  const selected = useSelector(getEditCustomer);

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 2, sm: 2 },
          ...(selectedLead && {
            bgcolor: selectionColor,
          }),
        }}
      >
        {selectedLead ? (
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
            {'1 lead selected'}
          </Typography>
        ) : (
          <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
            <FormattedMessage
              id="LEAD_LIST_TITLE"
              defaultMessage="Leads for {customer}"
              values={{ customer: `${selected?.firstName} ${selected?.lastName}` }}
            />
          </Typography>
        )}
        <LeadsMenuButtons />
      </Toolbar>
    </>
  );
};

export default LeadsTableToolbar;
