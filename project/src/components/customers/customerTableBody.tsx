import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { CustomerListItem } from '../../models';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedCustomers } from '../../selectors';
import { setSelectedCustomersAction } from '../../actions';
import { customerStatusDictionary } from './customerStatus';

interface ITableBodyProps {
  customerList: CustomerListItem[];
  page: number;
  dense: boolean;
  rowsPerPage: number;
  orderBy: keyof CustomerListItem;
}

const CustomerTableBody = (props: ITableBodyProps) => {
  const dispatch = useDispatch();
  const { customerList, page, dense, rowsPerPage } = props;

  const selected = useSelector(getSelectedCustomers);
  const handleClick = (customer: CustomerListItem) => {
    const selectedIndex = selected.indexOf(customer);
    let newSelected: CustomerListItem[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, customer);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    dispatch(setSelectedCustomersAction(newSelected));
  };

  const isSelected = (customer: CustomerListItem) =>
    selected.filter(p => p.id === customer.id).length > 0;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = () => {
    if (customerList && customerList?.length > 0) {
      return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customerList.length) : 0;
    }
    return 0;
  };

  return (
    <TableBody>
      {customerList.map((item: CustomerListItem, index: number) => {
        const isItemSelected = isSelected(item);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableRow
            hover
            onClick={() => handleClick(item)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={`${item.id}_${index}`}
            selected={isItemSelected}
          >
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={isItemSelected}
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
              {item.id}
            </TableCell>
            <TableCell align="left">{item.firstName}</TableCell>
            <TableCell align="left">{item.lastName}</TableCell>
            <TableCell align="left">{item.company}</TableCell>
            <TableCell align="left">{item.email}</TableCell>
            <TableCell align="left">{item.phoneNumber}</TableCell>
            <TableCell align="left">{customerStatusDictionary[item.status].value}</TableCell>
          </TableRow>
        );
      })}
      {emptyRows() > 0 && (
        <TableRow
          style={{
            height: (dense ? 33 : 53) * emptyRows(),
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default CustomerTableBody;
