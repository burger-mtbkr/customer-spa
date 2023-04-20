import { all } from 'redux-saga/effects';
import { deleteCustomerSaga } from './deleteCustomer.saga';
import { fetchAllCustomersSaga } from './fetchCustomers.saga';
import { loginSaga } from './login.saga';
import { saveCustomerSaga } from './saveCustomer.saga';
import { signupSaga } from './signup.saga';
export default function* rootSaga() {
  yield all([
    signupSaga(),
    loginSaga(),
    fetchAllCustomersSaga(),
    saveCustomerSaga(),
    deleteCustomerSaga(),
  ]);
}
