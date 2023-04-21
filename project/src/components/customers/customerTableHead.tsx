import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { CustomerListItem, Order } from '../../models';
import { TableSortLabel } from '@material-ui/core';

interface CustomerTableHeadProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, newOrderBy: keyof CustomerListItem) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof CustomerListItem;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Id',
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: true,
    label: 'First name',
  },
  {
    id: 'lastName',
    numeric: false,
    disablePadding: false,
    label: 'Last name',
  },
  {
    id: 'company',
    numeric: false,
    disablePadding: false,
    label: 'Company',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'phoneNumber',
    numeric: false,
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

const CustomerTableHead = (props: CustomerTableHeadProps) => {

  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler =
    (newOrderBy: keyof CustomerListItem) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, newOrderBy);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
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
