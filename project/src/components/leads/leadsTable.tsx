import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingSkeleton from '../common/loadingSkeleton';
import LeadsTableBody from './leadsTableBody';
import { fetchAllLeadsAction } from './../../actions/leads.actions';
import LeadsTableHead from './LeadsTableHead';
import LeadsTableToolbar from './leadsTableToolbar';
import { getAllCustomerLeads, getLeadsLoadingState } from '../../selectors';

const DEFAULT_ROWS_PER_PAGE = 10;

const LeadsTable = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const data = useSelector(getAllCustomerLeads);
  const isLoading = useSelector(getLeadsLoadingState);

  useEffect(() => {
    dispatch(fetchAllLeadsAction());
  }, [dispatch]);

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
        <LeadsTableToolbar />
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
                <LeadsTableHead />
                <LeadsTableBody
                  page={page}
                  leadsList={data}
                  dense={dense}
                  rowsPerPage={rowsPerPage}
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

export default LeadsTable;
