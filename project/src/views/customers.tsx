/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@material-ui/core';

import CustomerList from '../components/customers/customerTable';

const Customers = (): JSX.Element => {
  return (
    <Container maxWidth="lg">
      <CustomerList />
    </Container>
  );
};

export default Customers;
