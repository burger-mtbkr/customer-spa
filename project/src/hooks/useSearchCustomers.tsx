import { useEffect, useState } from 'react';
import { CustomerListItem } from '../models';

export const useSearchCustomer = (data: CustomerListItem[]) => {
  const [filteredCustomers, setFilteredCustomers] = useState(data);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    const filtered = data.filter(c => {
      const firstName = c.firstName.toLowerCase().includes(searchString.toLowerCase());
      const lastName = c.lastName.toLowerCase().includes(searchString.toLowerCase());
      const company = c.company.toLowerCase().includes(searchString.toLowerCase());
      const emailMatch = c.email.toLowerCase().includes(searchString.toLowerCase());
      return firstName || emailMatch || lastName || company;
    });
    setFilteredCustomers(filtered);
  }, [data, searchString]);

  return [filteredCustomers, setSearchString] as const;
};
