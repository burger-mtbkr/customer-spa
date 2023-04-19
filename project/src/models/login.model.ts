import * as yup from 'yup';
import { SchemaOf } from 'yup';

export interface ILoginRequest {
  email: String;
  password: String;
}

export interface ILogin {
  email: String;
  password: String;
  rememberLogin: boolean;
}

export const LoginSchema: SchemaOf<ILogin> = yup
  .object()
  .shape({
    email: yup
      .string()
      .required('Email address is required')
      .min(5, 'Email must be more than 5 char')
      .max(50, 'Email must be less than 50 char'),
    password: yup
      .string()
      .required('Password address is required')
      .min(5, 'Password must be more than 5 char')
      .max(50, 'Password must be less than 50 char'),
    rememberLogin: yup.boolean(),
  })
  .default({
    email: '',
    password: '',
    rememberLogin: true,
  });
