import { storageUtil } from '../utils';

export const getHeaders = () => {
  const t = storageUtil.getString('t');
  const headers = {
    Authorization: t,
    'Content-Type': 'application/json',
  };

  return headers;
};
