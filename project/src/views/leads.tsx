import { Container } from '@material-ui/core';
import LeadsTable from '../components/leads/leadsTable';

export const Leads = (): JSX.Element => {
  return (
    <Container maxWidth="lg">
      <LeadsTable />
    </Container>
  );
};

export default Leads;
