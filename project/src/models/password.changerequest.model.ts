import * as yup from 'yup';

import { SchemaOf } from 'yup';

export interface IPasswordChangeRequest {
  userId: String;
  oldPassword: String;
  confirmNewPassword: String;
  newPassword: String;
}

export const PasswordChangeSchema: SchemaOf<IPasswordChangeRequest> = yup
  .object()
  .shape({
    userId: yup.string().required(),
    oldPassword: yup.string().required('Old password is required'),
    newPassword: yup
      .string()
      .required('New password is required')
      .min(5, 'New password must be more than 5 char')
      .max(50, 'New password must be less than 50 char'),
    confirmNewPassword: yup
      .string()
      .required('Confirm your new password')
      .test(
        'confirmNewPassword_test',
        'Your new password does not match the confiormation',
        function (value) {
          const { newPassword } = this.parent;
          return newPassword === value;
        },
      ),
  })
  .default({
    userId: '',
    oldPassword: '',
    confirmNewPassword: '',
    newPassword: '',
  });
