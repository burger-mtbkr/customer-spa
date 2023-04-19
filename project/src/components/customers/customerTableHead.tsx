import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { ICustomer } from '../../models';

interface CustomerTableHeadProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof ICustomer;
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
    label: 'Name',
  },
  {
    id: 'lastName',
    numeric: false,
    disablePadding: false,
    label: 'Lastname',
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

const CustomerTableHead = ({ onSelectAllClick, numSelected, rowCount }: CustomerTableHeadProps) => {
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
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={'asc'}
          >
            <strong>{headCell.label}</strong>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CustomerTableHead;
