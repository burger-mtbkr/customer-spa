import { Checkbox, TableSortLabel } from '@material-ui/core';
import { CustomerListItem, Order } from '../../models';

import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { customerHeadCells } from './customersHeadCells';
import { useIntl } from 'react-intl';

interface CustomerTableHeadProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, newOrderBy: keyof CustomerListItem) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const CustomerTableHead = (props: CustomerTableHeadProps) => {
  const intl = useIntl();
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler =
    (newOrderBy: keyof CustomerListItem) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, newOrderBy);
    };

  const selectAllTooltip = intl.formatMessage({
    id: 'SELECT_ALL_TOOLTIP',
    defaultMessage: 'Select all',
  });

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            title={selectAllTooltip}
            inputProps={{
              'aria-label': selectAllTooltip,
            }}
          />
        </TableCell>
        {customerHeadCells.map(headCell => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <strong>{headCell.label}</strong>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CustomerTableHead;
