import { FormattedMessage, useIntl } from 'react-intl';
import { IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from '@material-ui/core';
import { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ClearIcon from '@mui/icons-material/Clear';
import { Grid } from '@mui/material';
import React from 'react';
import { customerStatusDictionary } from './customerStatus';
import { getCustomersSearchParams } from '../../selectors';
import { setCustomerSearchRequestAction } from '../../actions';

export const CustomerSearchBar = () => {
  const dispatch = useDispatch();
  const searchRef = createRef<HTMLDivElement>();
  const intl = useIntl();
  const [searchText, setSearchText] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<number>(-1);
  const searchParams = useSelector(getCustomersSearchParams);

  useEffect(() => {
    dispatch(
      setCustomerSearchRequestAction({
        sortBy: searchParams.sortBy,
        sortDirection: searchParams.sortDirection,
        searchText: searchText,
        statusFilter: filter,
      }),
    );
  }, [dispatch, filter, searchParams.sortBy, searchParams.sortDirection, searchText]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const clearSearch = () => {
    setSearchText(undefined);
    const input = searchRef.current?.querySelector('input');
    if (input) {
      input.value = '';
    }
  };

  const onFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedFilter = event.target.value as number;
    setFilter(selectedFilter);
  };

  const searchLabel = intl.formatMessage({
    id: 'CUSTOMER_SEARCH_LABEL',
    defaultMessage: 'Search customers',
  });

  const searchPlaceholder = intl.formatMessage({
    id: 'CUSTOMER_SEARCH_PLACEHOLDER',
    defaultMessage: 'Search...',
  });

  const clearSearchLabel = intl.formatMessage({
    id: 'CUSTOMER_SEARCH_CLEAR',
    defaultMessage: 'Clear search',
  });

  return (
    <>
      <Grid
        container
        justifyItems="center"
        justifyContent="center"
        direction="row"
        marginBottom={1}
      >
        <Grid item margin={2}>
          <Grid container direction={'row'}>
            <TextField
              ref={searchRef}
              value={searchText}
              type="text"
              aria-label={searchLabel}
              label={searchLabel}
              placeholder={searchPlaceholder}
              variant="outlined"
              onChange={onSearchChange}
            />
            <Tooltip title={clearSearchLabel}>
              <IconButton onClick={clearSearch}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid item margin={2}>
          <Grid container direction={'row'}>
            <Grid item paddingTop={2.5}>
              <InputLabel>
                <FormattedMessage
                  id={'CUSTOMER_SEARCH_FILTER_STATUS_LABEL'}
                  defaultMessage={'Filter status'}
                />
              </InputLabel>
            </Grid>
            <Grid item marginLeft={2}>
              <Select variant="outlined" fullWidth defaultValue={filter} onChange={onFilterChange}>
                <MenuItem value={-1}>All</MenuItem>
                {React.Children.toArray(
                  customerStatusDictionary.map(record => (
                    <MenuItem value={record.key}>{record.value}</MenuItem>
                  )),
                )}
              </Select>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
