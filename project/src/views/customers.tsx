import { Container } from '@material-ui/core';
import CustomerTable from '../components/customers/customerTable';

export const Customers = (): JSX.Element => {
  return (
    <Container maxWidth="lg">
      <CustomerTable />
    </Container>
  );
};

export default Customers;
