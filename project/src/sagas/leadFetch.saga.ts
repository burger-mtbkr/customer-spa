import { IFetchLeadsResponse } from '../models';
import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { fetchCustomerLeads } from '../api';
import { isLoadingAction } from '../actions';
import {
  fetchAllLeadsAction,
  fetchAllLeadsDoneAction,
  setSaveLeadDoneAction,
  setSelectedLeadAction,
} from '../actions/leads.actions';
import { getSelectedCustomers } from '../selectors';
import { ICustomer } from './../models/customer.model';

export function* fetchCustomerLeadsAsync(): SagaIterator {
  try {
    yield put(isLoadingAction(true));
    yield put(setSelectedLeadAction(undefined));
    yield put(
      setSaveLeadDoneAction({
        lead: undefined,
      }),
    );

    const customers: ICustomer[] = yield select(getSelectedCustomers);
    if (!customers || !customers[0].id) {
      throw new Error('Please selet a customer');
    }

    const response: IFetchLeadsResponse = yield call(fetchCustomerLeads, customers[0].id);

    yield put(fetchAllLeadsDoneAction(response));
  } catch (error) {
    yield put(
      fetchAllLeadsDoneAction({
        leads: [],
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(isLoadingAction(false));
  }
}

export function* fetchCustomerLeadsSaga(): SagaIterator {
  yield takeLatest(fetchAllLeadsAction, fetchCustomerLeadsAsync);
}
