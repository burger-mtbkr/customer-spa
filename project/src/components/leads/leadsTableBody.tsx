import { Checkbox, Typography } from '@material-ui/core';
import { getLeadStatusStyle, leadsStatusDictionary } from './leadStatus';
import { useDispatch, useSelector } from 'react-redux';

import { ILeadListItem } from '../../models';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { getSelectedLead } from './../../selectors/leads.selectors';
import { selectionColor } from '../../theme';
import { setSelectedLeadAction } from '../../actions';
import { useIntl } from 'react-intl';

interface ITableBodyProps {
  leadsList: ILeadListItem[];
  page: number;
  dense: boolean;
  rowsPerPage: number;
}

const LeadsTableBody = (props: ITableBodyProps) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { leadsList, page, dense, rowsPerPage } = props;
  const selectedLead = useSelector(getSelectedLead);

  const selected = useSelector(getSelectedLead);

  const handleClick = (newSelected: ILeadListItem) => {
    dispatch(setSelectedLeadAction(selectedLead?.id === newSelected.id ? undefined : newSelected));
  };

  const isSelected = (lead: ILeadListItem) => selected?.id === lead.id;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = () => {
    if (leadsList && leadsList?.length > 0) {
      return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - leadsList.length) : 0;
    }
    return 0;
  };

  return (
    <TableBody>
      {leadsList.map((item: ILeadListItem, index: number) => {
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
            <TableCell align="left">
              <Typography>{item.name}</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography>{item.source}</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography style={getLeadStatusStyle(item)}>
                {leadsStatusDictionary[item.status].value}
              </Typography>
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

export default LeadsTableBody;
