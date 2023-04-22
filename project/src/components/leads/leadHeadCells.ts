import { ILead } from '../../models';
import { HeadCell } from '../../models/tableHeadCell';

type LeadHeadCell = HeadCell & {
  id: keyof ILead;
};

export const leadsHeadCells: readonly LeadHeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'source',
    numeric: false,
    disablePadding: false,
    label: 'Source',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];
