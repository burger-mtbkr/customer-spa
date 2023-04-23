import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchAllLeadsAction,
  fetchAllLeadsDoneAction,
  setSaveLeadDoneAction,
  setSelectedLeadAction,
} from '../actions/leads.actions';

import { ICustomer } from './../models/customer.model';
import { IFetchLeadsResponse } from '../models';
import { SagaIterator } from 'redux-saga';
import { fetchCustomerLeads } from '../api';
import { getEditCustomer } from './../selectors/customer.selectors';
import { isLoadingAction } from '../actions';

export function* fetchCustomerLeadsAsync(): SagaIterator {
  let response: IFetchLeadsResponse = {};
  try {
    yield put(isLoadingAction(true));
    yield put(setSelectedLeadAction(undefined));
    yield put(
      setSaveLeadDoneAction({
        lead: undefined,
      }),
    );

    const customer: ICustomer = yield select(getEditCustomer);

    if (!customer || !customer?.id) {
      throw new Error('Please select a customer');
    }

    response = yield call(fetchCustomerLeads, customer.id);

    yield put(fetchAllLeadsDoneAction(response));
  } catch (error) {
    yield put(fetchAllLeadsDoneAction({ ...response, error: response.error }));
  } finally {
    yield put(isLoadingAction(false));
  }
}

export function* fetchCustomerLeadsSaga(): SagaIterator {
  yield takeLatest(fetchAllLeadsAction, fetchCustomerLeadsAsync);
}
