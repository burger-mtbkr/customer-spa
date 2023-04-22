import { ILoginResponse } from '../models';

export const getLoginError = (response: ILoginResponse | undefined) => {
  if (response && response.error) {
    if (response.error) {
      if (response.error.message === 'Network Error')
        return 'A connection error has occured.  Please try again or make sure your using the allow cors plugin if your running this on local host';

      if (response.error.message === 'Request failed with status code 404')
        return 'No login exists for this user.  Make sure you have signed up.';

      if (response.error.message === 'Request failed with status code 401')
        return 'Please check your password and try again.';

      return 'An error has occurred please try again';
    }

    return '';
  }
};
