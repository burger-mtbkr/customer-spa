import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { LeadsMenuButtons } from './leadsMenuButton';
import { getSelectedLead } from './../../selectors/leads.selectors';
import { getEditCustomer } from '../../selectors';
import { FormattedMessage } from 'react-intl';

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
            bgcolor: (theme: {
              palette: { primary: { main: string }; action: { activatedOpacity: number } };
            }) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
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
              id="LEADS_LIST_TITLE"
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
