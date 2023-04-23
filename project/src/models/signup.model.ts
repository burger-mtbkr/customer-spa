import * as yup from 'yup';

import { AxiosError } from 'axios';
import { SchemaOf } from 'yup';

export interface ISignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export type ISignup = ISignupRequest & {
  confirmPassword: string;
};

export const SignupSchema: SchemaOf<ISignup> = yup
  .object()
  .shape({
    firstName: yup.string().max(25).min(3).required(),
    lastName: yup.string().max(25).min(3).required(),
    email: yup.string().email().max(25).min(3).required(),
    password: yup.string().max(20).min(5).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match!"),
  })
  .default({
    id: undefined,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

export interface ISignupResponse {
  error?: AxiosError | Error;
}

export interface ISignupState {
  signupInProgress: boolean;
  signupResponse?: ISignupResponse;
}
