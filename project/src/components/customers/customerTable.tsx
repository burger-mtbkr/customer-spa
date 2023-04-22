import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { CustomerListItem, Order } from '../../models';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomerTableToolbar from './customerTableToolbar';
import { getCustomersLoadingState, getCustomersSearchParams } from '../../selectors';
import { fetchAllCustomersAction, setCustomerSearchRequestAction } from '../../actions';
import LoadingSkeleton from '../common/loadingSkeleton';
import { CustomerSearchBar } from './searchBar';
import { DensityControl } from './../common/densityControl';
import { CustomerTableContainer } from './customerTableContainer';

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'firstName';

const CustomerTable = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState<Order>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState<keyof CustomerListItem>(DEFAULT_ORDER_BY);

  const [dense, setDense] = useState(false);
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

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <CustomerTableToolbar />
        <CustomerSearchBar />
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <CustomerTableContainer
            orderBy={orderBy}
            order={order}
            dense={dense}
            handleRequestSort={handleRequestSort}
          />
        )}
      </Paper>
      <DensityControl dense={dense} setDense={setDense} />
    </Box>
  );
};

export default CustomerTable;
