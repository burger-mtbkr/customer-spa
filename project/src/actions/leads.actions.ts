import { ILead, ILeadResponse, IFetchLeadsResponse, ILeadListItem } from '../models';
import { createAction } from '@reduxjs/toolkit';

const LEAD_PREFIX = 'LEAD';

/* APP STATE */
export const setSelectedLeadAction = createAction<ILeadListItem | undefined>(
  `${LEAD_PREFIX}_SET_SELECTED_LEADS`,
);

export const isLeadsLoadingAction = createAction<boolean>(`${LEAD_PREFIX}/API/LEADS_IS_LOADING`);

/* LOAD LEAD */

export const fetchLeadAction = createAction<string>(`${LEAD_PREFIX}/API/FETCH_LEAD`);

export const fetchLeadDoneAction = createAction<ILeadResponse>(
  `${LEAD_PREFIX}/API/FETCH_LEAD_DONE`,
);

/* LOAD ALL LEADS */

/* LOAD ALL LEADS */
export const fetchAllLeadsAction = createAction(`${LEAD_PREFIX}/API/FETCH_ALL_LEADS`);

export const fetchAllLeadsDoneAction = createAction<IFetchLeadsResponse>(
  `${LEAD_PREFIX}/API/FETCH_ALL_LEADS_DONE`,
);

/* SAVE LEAD */
export const isLeadsSavingAction = createAction<boolean>(`${LEAD_PREFIX}API/SAVE_LEAD_IS_SAVING`);

export const saveLeadAction = createAction<ILead>(`${LEAD_PREFIX}/API/SAVE_LEAD`);

export const setSaveLeadDoneAction = createAction<ILeadResponse>(
  `${LEAD_PREFIX}/API/SAVE_LEAD_DONE`,
);
