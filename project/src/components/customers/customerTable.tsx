import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Switch from '@mui/material/Switch';
import { CustomerListItem, Order } from '../../models';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomerTableToolbar from './customerTableToolbar';
import CustomerTableHead from './customerTableHead';
import { getAllCustomers, getCustomersLoadingState, getSelectedCustomers } from '../../selectors';
import { fetchAllCustomersAction, setSelectedCustomersAction } from '../../actions';
import LoadingSkeleton from './loadingSkeleton';
import { IconButton, TextField, Tooltip } from '@material-ui/core';
import CustomerTableBody from './customerTableBody';
import { getComparator, stableSort } from '../../utils';

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
  const [visibleRows, setVisibleRows] = useState(data);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchAllCustomersAction(''));
  }, []);

  useEffect(() => {
    let rowsOnMount = stableSort(data, getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY));
    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
    );

    setVisibleRows(rowsOnMount);
  }, [data]);

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: keyof CustomerListItem) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(data, getComparator(toggledOrder, newOrderBy));
      const updatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

      setVisibleRows(updatedRows);
    },
    [orderBy, order, data, page, rowsPerPage],
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

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return isLoading ? (
    <LoadingSkeleton />
  ) : (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <CustomerTableToolbar />
        <TextField
          value={searchText}
          type="text"
          label="Search customers"
          placeholder="Search..."
          variant="outlined"
          onChange={onSearchChange}
        />
        <Tooltip title="Search">
          <IconButton
            onClick={() => {
              dispatch(fetchAllCustomersAction(searchText));
            }}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add">
          <IconButton
            onClick={() => {
              setSearchText('');
              dispatch(fetchAllCustomersAction(''));
            }}
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
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
              onRequestSort={handleRequestSort}
              rowCount={data?.length || 0}
            />
            <CustomerTableBody
              page={page}
              customerList={visibleRows}
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
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export default CustomerTable;
