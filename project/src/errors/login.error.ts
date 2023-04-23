import { ILoginResponse } from '../models';
import { IntlShape } from 'react-intl';

export const getLoginError = (response: ILoginResponse | undefined, intl: IntlShape) => {
  if (response && response.error) {
    if (response.error) {
      if (response.error.message === 'Network Error') {
        return intl.formatMessage({
          id: 'NETWORK_ERROR',
          defaultMessage:
            'A connection error has occured.  Please try again or make sure your using the allow cors plugin if your running this on local host.',
        });
      }

      if (response.error.message === 'Request failed with status code 404') {
        return intl.formatMessage({
          id: 'LOGIN_404_ERROR',
          defaultMessage: 'No login exists for this user.  Make sure you have signed up.',
        });
      }

      if (response.error.message === 'Request failed with status code 401') {
        return intl.formatMessage({
          id: 'LOGIN_PASSWORD_ERROR',
          defaultMessage: 'Please check your password and try again.',
        });
      }

      return intl.formatMessage({
        id: 'ERROR_GENERAL',
        defaultMessage: 'An error has occurred please try again.',
      });
    }
    return '';
  }
};
