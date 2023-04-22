import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ILeadResponse, ILead } from '../models';
import { saveLead } from '../api';
import { isLeadsSavingAction, setSaveLeadDoneAction } from '../actions';
import { saveLeadAction } from './../actions/leads.actions';

export function* saveLeadAsync(action: { payload: ILead }): SagaIterator {
  let response: ILeadResponse = {};
  try {
    yield put(isLeadsSavingAction(true));
    response = yield call(saveLead, action.payload);
    yield put(setSaveLeadDoneAction(response));
  } catch (error) {
    yield put(setSaveLeadDoneAction({ ...response, error: response.error }));
  } finally {
    yield put(isLeadsSavingAction(false));
  }
}

export function* saveLeadSaga(): SagaIterator {
  yield takeLatest(saveLeadAction, saveLeadAsync);
}
