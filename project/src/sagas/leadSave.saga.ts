import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ILeadResponse, ILead } from '../models';
import { saveLead } from '../api';
import { isLeadsSavingAction, setSaveLeadDoneAction } from '../actions';
import { saveLeadAction } from './../actions/leads.actions';

export function* saveLeadAsync(action: { payload: ILead }): SagaIterator {
  try {
    yield put(isLeadsSavingAction(true));

    const response: ILeadResponse = yield call(saveLead, action.payload);
    yield put(setSaveLeadDoneAction(response));
  } catch (error) {
    yield put(
      setSaveLeadDoneAction({
        lead: action.payload,
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(isLeadsSavingAction(false));
  }
}

export function* saveLeadSaga(): SagaIterator {
  yield takeLatest(saveLeadAction, saveLeadAsync);
}
