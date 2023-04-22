import { ISignupResponse } from '../models';

export const getSignupError = (response: ISignupResponse | undefined) => {
  if (response && response.error) {
    if (response.error) {
      if (response.error.message === 'Network Error')
        return 'A connection error has occured.  Please try again or make sure your using the allow cors plugin if your running this on local host';

      return 'An error has occurred please try again';
    }
    return '';
  }
};
