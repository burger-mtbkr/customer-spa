import { CustomerListItem } from '../../models';
import { HeadCell } from '../../models/tableHeadCell';

type CustomerHeadCell = HeadCell & {
  id: keyof CustomerListItem;
};

export const customerHeadCells: readonly CustomerHeadCell[] = [
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
  {
    id: 'leadCount',
    numeric: true,
    disablePadding: false,
    label: 'Nr of Leads',
  },
];
