import { CustomerListItem, Order } from '../../models';
import { TableContainer, TablePagination } from '@material-ui/core';
import { getAllCustomers, getSelectedCustomers } from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';

import CustomerTableBody from './customerTableBody';
import CustomerTableHead from './customerTableHead';
import Table from '@mui/material/Table';
import { setSelectedCustomersAction } from '../../actions';
import { useState } from 'react';

const DEFAULT_ROWS_PER_PAGE = 10;

interface ICustomerContainerProps {
  orderBy: keyof CustomerListItem;
  order: Order;
  dense: boolean;
  handleRequestSort: (property: keyof CustomerListItem) => void;
}

export const CustomerTableContainer = ({
  orderBy,
  order,
  dense,
  handleRequestSort,
}: ICustomerContainerProps) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const data = useSelector(getAllCustomers);
  const selected = useSelector(getSelectedCustomers);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, DEFAULT_ROWS_PER_PAGE));
    setPage(0);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newlySelected = data?.map((n: CustomerListItem) => n);
      if (newlySelected) {
        dispatch(setSelectedCustomersAction(newlySelected));
      }
      return;
    }
    dispatch(setSelectedCustomersAction([]));
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 600 }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <CustomerTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={(_e, property) => handleRequestSort(property)}
            rowCount={data?.length || 0}
          />
          <CustomerTableBody
            page={page}
            customerList={data}
            dense={dense}
            rowsPerPage={rowsPerPage}
            orderBy={orderBy}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_e, n) => handleChangePage(n)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
