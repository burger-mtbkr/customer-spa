import { IPasswordChangeResponse } from '../models';
import { TStoreState } from '../reducers';

export const getChangePasswordResponse = (
  state: TStoreState,
): IPasswordChangeResponse | undefined => state.passwordChange.passwordChangeResponse;
