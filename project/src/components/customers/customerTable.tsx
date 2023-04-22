import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { CustomerListItem, Order } from '../../models';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomerTableToolbar from './customerTableToolbar';
import CustomerTableHead from './customerTableHead';
import {
  getAllCustomers,
  getCustomersLoadingState,
  getCustomersSearchParams,
  getSelectedCustomers,
} from '../../selectors';
import {
  fetchAllCustomersAction,
  setCustomerSearchRequestAction,
  setSelectedCustomersAction,
} from '../../actions';
import LoadingSkeleton from '../common/loadingSkeleton';
import CustomerTableBody from './customerTableBody';
import { CustomerSearchBar } from './searchBar';

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'firstName';
const DEFAULT_ROWS_PER_PAGE = 10;

const CustomerTable = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState<Order>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState<keyof CustomerListItem>(DEFAULT_ORDER_BY);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const data = useSelector(getAllCustomers);
  const selected = useSelector(getSelectedCustomers);
  const isLoading = useSelector(getCustomersLoadingState);
  const searchParams = useSelector(getCustomersSearchParams);

  const fetchCustomers = useCallback(() => {
    dispatch(fetchAllCustomersAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      setCustomerSearchRequestAction({
        sortBy: orderBy,
        sortDirection: order,
        searchText: searchParams.searchText,
      }),
    );
  }, [dispatch, order, orderBy, searchParams.searchText]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers, searchParams]);

  const handleRequestSort = useCallback(
    (property: keyof CustomerListItem) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [orderBy, order],
  );

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

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, DEFAULT_ROWS_PER_PAGE));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <CustomerTableToolbar />
        <CustomerSearchBar />
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
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
        )}
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export default CustomerTable;
