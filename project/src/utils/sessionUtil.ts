import jwt_decode from 'jwt-decode';
import { storageUtil } from './storageUtil';
import { dateUtil } from './dateUtil';

interface IJwt {
  USER_EMAIL: string;
  USER_ID: string;
  USER_NAME: string;
  aud: string;
  exp: number;
  iss: string;
  nbf: number;
}

export const sessionUtil = {
  deleteSessionInfo(): void {
    storageUtil.deleteItem('t');
  },

  getInfo(): IJwt | undefined {
    const token: string = storageUtil.getString('t');
    if (token) {
      const decoded: IJwt = jwt_decode(token) as IJwt;
      return decoded;
    }
    return undefined;
  },

  isActive(): boolean {
    const jwtInfo = sessionUtil.getInfo();
    if (jwtInfo) {
      const now: number = dateUtil.getUnix();
      const valid = now < jwtInfo.exp;
      if (!valid) sessionUtil.deleteSessionInfo();
      return valid;
    }
    return false;
  },
};
