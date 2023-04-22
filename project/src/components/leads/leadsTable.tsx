import { getEditCustomer, getLeadsLoadingState } from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { DensityControl } from '../common/densityControl';
import LeadsTableContainer from './leadsTableContainer';
import LeadsTableToolbar from './leadsTableToolbar';
import LoadingSkeleton from '../common/loadingSkeleton';
import Paper from '@mui/material/Paper';
import { ROOT } from '../../routes/paths';
import { fetchAllLeadsAction } from './../../actions/leads.actions';
import { useHistory } from 'react-router-dom';

const LeadsTable = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedCustomer = useSelector(getEditCustomer);
  const isLoading = useSelector(getLeadsLoadingState);
  const [dense, setDense] = useState(false);
  useEffect(() => {
    if (!selectedCustomer) history.replace(ROOT);
  }, [selectedCustomer, history]);

  useEffect(() => {
    dispatch(fetchAllLeadsAction());
  }, [dispatch]);

  return (
    <Box sx={{ width: '100%' }}>
      {selectedCustomer ? (
        <>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <LeadsTableToolbar />
            {isLoading ? <LoadingSkeleton /> : <LeadsTableContainer dense={dense} />}
          </Paper>
          <DensityControl dense={dense} setDense={setDense} />
        </>
      ) : null}
    </Box>
  );
};

export default LeadsTable;
