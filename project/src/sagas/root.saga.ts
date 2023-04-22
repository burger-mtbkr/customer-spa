import { all } from 'redux-saga/effects';
import { deleteCustomerSaga } from './customerDelete.saga';
import { fetchAllCustomersSaga } from './customersFetch.saga';
import { fetchCustomerLeadsSaga } from './leadFetch.saga';
import { loginSaga } from './login.saga';
import { saveCustomerSaga } from './customerSave.saga';
import { saveLeadSaga } from './leadSave.saga';
import { signupSaga } from './signup.saga';

export default function* rootSaga() {
  yield all([
    signupSaga(),
    loginSaga(),
    fetchAllCustomersSaga(),
    saveCustomerSaga(),
    deleteCustomerSaga(),
    fetchCustomerLeadsSaga(),
    saveLeadSaga(),
  ]);
}
