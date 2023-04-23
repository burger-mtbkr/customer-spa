import { ILeadListItem } from './../../models/lead.model';
import { StatusGroup } from '../../models';

export const leadsStatusDictionary: StatusGroup[] = [
  {
    key: 0,
    value: 'New',
    colour: '#ff4040',
  },
  {
    key: 1,
    value: 'Closed Won',
    colour: '#272c00',
  },
  {
    key: 2,
    value: 'Closed Lost',
  },
];

export const getLeadStatusStyle = (item: ILeadListItem) => {
  return {
    fontWeight: item.status === 2 ? 'normal' : '600',
    color: leadsStatusDictionary[item.status].colour,
  };
};
