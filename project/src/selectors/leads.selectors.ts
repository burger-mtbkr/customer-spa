import { ILeadListItem, ILeadResponse } from './../models/lead.model';

import { TStoreState } from '../reducers';

export const getLeadsLoadingState = (state: TStoreState): boolean => state.leads.isLoading;

export const getAllCustomerLeads = (state: TStoreState): ILeadListItem[] =>
  state.leads.leadsListResponse?.leads || [];

export const getSelectedLead = (state: TStoreState): ILeadListItem | undefined =>
  state.leads.selectedLead ? state.leads.selectedLead : undefined;

export const selectLeadsIsSaving = (state: TStoreState): boolean => state.leads.isSaving;

export const getLeadSaveResponse = (state: TStoreState): ILeadResponse | undefined =>
  state.leads.leadSaveResponse;
