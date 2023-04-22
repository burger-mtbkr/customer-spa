import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { leadsHeadCells } from './leadHeadCells';

const LeadsTableHead = () => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox" />
      {leadsHeadCells.map(headCell => (
        <TableCell
          key={headCell.id}
          padding={headCell.disablePadding ? 'none' : 'normal'}
          sortDirection={'asc'}
        >
          <strong>{headCell.label}</strong>
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

export default LeadsTableHead;
