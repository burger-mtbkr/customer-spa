import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { ISignup, SignupSchema } from '../models';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { signUpAction } from '../actions';
import { getSignupResponse } from '../selectors/signup.selectors';
import SignupForm from '../components/signup/signupForm';
import SignupButtons from '../components/signup/signUpButtons';

export const Signup = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const signupResponse = useSelector(getSignupResponse);

  const signupModel: ISignup = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignup>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit: SubmitHandler<ISignup> = (c: ISignup) => {
    dispatch(signUpAction(c));
  };

  useEffect(() => {
    if (signupResponse?.isSuccessful === true) {
      history.push('/');
    } else if (signupResponse?.isSuccessful === false) {
      alert(`Failed to save`);
    }
  }, [signupResponse, history]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SignupForm errors={errors} register={register} model={signupModel} />
      <SignupButtons />
    </form>
  );
};
