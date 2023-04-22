import { CustomerListItem, StatusGroup } from '../../models';

export const customerStatusDictionary: StatusGroup[] = [
  {
    key: 0,
    value: 'Active',
    colour: '#88d8b0',
  },
  {
    key: 1,
    value: 'Lead',
    colour: '#ff6f69',
  },
  {
    key: 2,
    value: 'Non active',
  },
];

export const getCustomerStyle = (item: CustomerListItem) => {
  return {
    fontWeight: item.status === 2 ? 'normal' : '600',
    color: customerStatusDictionary[item.status].colour,
  };
};
