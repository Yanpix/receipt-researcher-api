import { Request } from 'express';
import { IOrganization } from './../organization/organization.model';
import { IUnit } from './../unit/unit.model';
import { IItem } from './../item/item.model';

export interface IReceipt {
  organization: IOrganization;
  unit: IUnit;
  items: IItem[];
  receipt_id?: number;
  organization_id: number;
  unit_id: number;
  user_id: number;
  receiptId: string;
  ico: string;
  cashRegisterCode: string;
  issueDate: string;
  createDate: string;
  customerId: string;
  dic: string;
  icDph: string;
  invoiceNumber: string;
  okp: string;
  paragon: boolean;
  paragonNumber: string;
  pkp: string;
  receiptNumber: number
  type: string;
  taxBaseBasic: number;
  taxBaseReduced: number;
  totalPrice: number;
  freeTaxAmount: number;
  vatAmountBasic: number;
  vatAmountReduced: number;
  vatRateBasic: number;
  vatRateReduced: number;
};

export interface IAddReceiptReq extends Request<any, any, IReceipt> { }
export interface IGetReceiptReq extends Request<{ receiptId: IReceipt['receipt_id'] }> { }
export interface IGetReceiptByDateReq extends Request<{ from: IReceipt['issueDate'], to: IReceipt['issueDate'] }> { }