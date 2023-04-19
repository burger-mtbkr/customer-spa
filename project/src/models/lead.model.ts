import { LeadStatus } from './../enums/leadStatus.enum';
import * as yup from 'yup';
import { SchemaOf } from 'yup';

export interface ILead {
  id?: string;
  customerId: string;
  status: LeadStatus;
  name: string;
  source: string;
}
export interface ICalculateRates {
  taxRate: number;
  accLevy: number;
  kiwi: number;
}

export const LeadSchema: SchemaOf<ILead> = yup
  .object()
  .shape({
    id: yup.string(),
    customerId: yup.string().required('Please select a customer'),
    name: yup.string().max(25).min(3).required(),
    source: yup.string().max(25).min(3).required(),
    status: yup
      .mixed<LeadStatus>()
      .oneOf([LeadStatus.NEW, LeadStatus.CLOSED_LOST, LeadStatus.CLOSED_WON])
      .required(),
  })
  .default({
    id: undefined,
    customerId: '',
    status: LeadStatus.NEW,
    name: '',
    source: '',
  });
