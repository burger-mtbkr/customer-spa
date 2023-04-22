import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingSkeleton from '../common/loadingSkeleton';
import { fetchAllLeadsAction } from './../../actions/leads.actions';
import LeadsTableToolbar from './leadsTableToolbar';
import { getEditCustomer, getLeadsLoadingState } from '../../selectors';
import { useHistory } from 'react-router-dom';
import { ROOT } from '../../routes/paths';
import LeadsTableContainer from './leadsTableContainer';
import { DensityControl } from '../common/densityControl';

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
