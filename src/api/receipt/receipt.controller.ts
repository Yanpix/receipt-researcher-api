import { Request, RequestHandler, Response } from 'express';
import * as ReceiptService from './receipt.service';
import { insertOrganization, getOrganizationById } from './../organization/organization.service';
import { getUnitById, insertUnit } from './../unit/unit.service';
import { getItems, insertItem } from './../item/item.service';
import { getReceiptData } from './../middlewares/fetch-receipt.middleware';
import { getUserIdFromToken } from './../middlewares/auth.middleware'
import { CustomError } from './../models/custom-error.model';
import { IReceipt, IAddReceiptReq, IGetReceiptReq, IGetReceiptByDateReq } from './receipt.model';
import { IOrganization } from './../organization/organization.model';

/**
 * Inserts a new Receipt record based
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore

export const addReceipt: RequestHandler = async (req: IAddReceiptReq, res: Response) => {
  try {
    // get receipt data from tax API
    const receiptData = await getReceiptData(req.body.receiptId);

    // get user id from jwt token
    req.body.user_id = await getUserIdFromToken(req.headers.authorization as string) as number;

    // get organization id if exists in the database or create new organization
    req.body.organization_id = await insertOrganization(receiptData.receipt.organization as IOrganization) as number;

    let unit = receiptData.receipt.unit;
    unit.organization_id = req.body.organization_id;

    // get unit id if exists in the database or create new unit
    req.body.unit_id = await insertUnit(unit) as number;

    const receiptId = await ReceiptService.insertReceipt(req.body, receiptData);

    await insertItem(receiptData.receipt.items, receiptId);

    res.status(200).json({
      receiptId
    });
  } catch (error) {
    console.error('[Receipt.controller][addReceipt][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });
    } else
      res.status(500).json({
        message: 'There was an error when adding new Receipt'
      });
  }
};

/**
 * Get Receipt record based on id provided
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore

export const getReceiptById: RequestHandler = async (req: IGetReceiptReq, res: Response) => {
  try {
    console.log(req.params);
    if ((typeof req.params.receiptId === 'string') && (req.params.receiptId === 'search')) {
      
      console.log(req.query.from);

    } else {
      let receipt = await ReceiptService.getReceiptById(req.params.receiptId);

      if (Object.keys(receipt).length === 0) {
        throw new CustomError('The receipt with this id does not exists', 400, '');
      };

      receipt.organization = await getOrganizationById(receipt.organization_id);

      receipt.unit = await getUnitById(receipt.unit_id);

      let items = await getItems(receipt.receipt_id as number);

      receipt.items = [];

      items.forEach(val => receipt.items.push(Object.assign({}, val)));

      res.status(200).json({
        receipt
      });
    };
  } catch (error) {
    console.error('[Receipt.controller][getReceiptById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });
    } else
      res.status(500).json({
        message: 'There was an error when getting Receipt by id'
      });
  }
};


/**
 * Get Receipt records by dates from to
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore

export const getReceiptByDate: RequestHandler = async (req: IGetReceiptByDateReq, res: Response) => {
  try {
    let receipt = await ReceiptService.getReceiptByDate(req.params.from, req.params.to);

    if (Object.keys(receipt).length === 0) {
      throw new CustomError('No receipts found within chosen timeframe', 400, '');
    };


    res.status(200).json({
      receipt
    });
  } catch (error) {
    console.error('[Receipt.controller][getReceiptByDate][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });
    } else {
      console.log(error);
      res.status(500).json({
        message: 'There was an error when getting Receipt by date'
      });
    }
  }
};