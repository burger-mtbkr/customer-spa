import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeadsTableBody from './leadsTableBody';
import { fetchAllLeadsAction } from './../../actions/leads.actions';
import LeadsTableHead from './LeadsTableHead';
import { getAllCustomerLeads, getEditCustomer } from '../../selectors';
import { useHistory } from 'react-router-dom';
import { ROOT } from '../../routes/paths';

const DEFAULT_ROWS_PER_PAGE = 10;

interface ILeadsTableContainer {
  dense: boolean;
}

const LeadsTableContainer = ({ dense }: ILeadsTableContainer) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const selectedCustomer = useSelector(getEditCustomer);
  const data = useSelector(getAllCustomerLeads);

  useEffect(() => {
    if (!selectedCustomer) history.replace(ROOT);
  }, [selectedCustomer, history]);

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

  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 600 }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <LeadsTableHead />
          <LeadsTableBody page={page} leadsList={data} dense={dense} rowsPerPage={rowsPerPage} />
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

export default LeadsTableContainer;
