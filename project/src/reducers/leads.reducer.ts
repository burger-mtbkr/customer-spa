import {
  fetchAllLeadsDoneAction,
  isLeadsLoadingAction,
  isLeadsSavingAction,
  setSaveLeadDoneAction,
  setSelectedLeadAction,
} from '../actions';

import { ILeadsState } from '../models';
import { createReducer } from '@reduxjs/toolkit';

export const leadInitialState: ILeadsState = {
  isLoading: false,
  isSaving: false,
};

export default createReducer(leadInitialState, builder =>
  builder
    .addCase(isLeadsLoadingAction, (state, { payload }) => ({
      ...state,
      isLoading: payload,
    }))
    .addCase(isLeadsSavingAction, (state, { payload }) => ({
      ...state,
      isSaving: payload,
    }))

    .addCase(setSelectedLeadAction, (state, { payload }) => ({
      actionTriggerRefetching: undefined,
      ...state,
      selectedLead: payload,
    }))
    .addCase(fetchAllLeadsDoneAction, (state, { payload }) => ({
      ...state,
      leadsListResponse: payload,
    }))
    .addCase(setSaveLeadDoneAction, (state, { payload }) => ({
      ...state,
      leadSaveResponse: payload,
    })),
);
