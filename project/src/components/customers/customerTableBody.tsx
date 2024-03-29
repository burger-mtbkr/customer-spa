import { Checkbox, Typography } from '@material-ui/core';
import { customerStatusDictionary, getCustomerStyle } from './customerStatus';
import { useDispatch, useSelector } from 'react-redux';

import { CustomerListItem } from '../../models';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { getSelectedCustomers } from '../../selectors';
import { selectionColor } from '../../theme';
import { setSelectedCustomersAction } from '../../actions';
import { useIntl } from 'react-intl';

interface ITableBodyProps {
  customerList: CustomerListItem[];
  page: number;
  dense: boolean;
  rowsPerPage: number;
  orderBy: keyof CustomerListItem;
}

const CustomerTableBody = (props: ITableBodyProps) => {
  const dispatch = useDispatch();
  const intl = useIntl();
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
        const selectLabel = intl.formatMessage(
          {
            id: 'SELECT_ROW_TOOLTIP',
            defaultMessage: 'Select the {index} row',
          },
          { index: index },
        );

        return (
          <TableRow
            hover
            style={{
              backgroundColor: isItemSelected ? selectionColor : '#FFF',
            }}
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
                title={selectLabel}
                inputProps={{
                  'aria-labelledby': selectLabel,
                }}
              />
            </TableCell>
            <TableCell align={'left'}>
              <Typography>{item.firstName}</Typography>
            </TableCell>
            <TableCell align={'left'}>
              <Typography>{item.lastName}</Typography>
            </TableCell>
            <TableCell align={'left'}>
              <Typography>{item.company}</Typography>
            </TableCell>
            <TableCell align={'left'}>
              <Typography>{item.email}</Typography>
            </TableCell>
            <TableCell align={'left'}>
              <Typography>{item.phoneNumber}</Typography>
            </TableCell>
            <TableCell align={'left'}>
              <Typography style={getCustomerStyle(item)}>
                {customerStatusDictionary[item.status].value}
              </Typography>
            </TableCell>
            <TableCell align={'left'}>
              <Typography>{item.leadCount}</Typography>
            </TableCell>
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
