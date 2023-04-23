import { IPasswordChangeRequest, IPasswordChangeResponse } from '../models';

import { createAction } from '@reduxjs/toolkit';

const USER_PREFIX = 'USER';

export const changePasswordAction = createAction<IPasswordChangeRequest>(
  `${USER_PREFIX}/API/CHANGE_PASSWORD`,
);

export const setChangePasswordDoneAction = createAction<IPasswordChangeResponse>(
  `${USER_PREFIX}/API/CHANGE_PASSWORD_DONE`,
);
