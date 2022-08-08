import { Request } from 'express';

export interface IItem {
  item_id? : number;
  receipt_id: number;
  name: string;
  itemType: string;
  quantity: number;
  vatRate:	number;
  price: number;
};

export interface IAddItemReq extends Request<any, any, IItem> { }