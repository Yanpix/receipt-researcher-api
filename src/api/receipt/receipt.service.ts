import { execute } from "./../utils/mysql.connector";
import { ReceiptQueries } from "./receipt.queries";
import { IReceipt } from "./receipt.model";
import { CustomError } from './../models/custom-error.model';
import moment from 'moment';

/**
 * adds a new active Receipt record
 */
export const insertReceipt = async (Receipt: IReceipt, receiptData: any) => {
  try {

    //check if there is no such receipt in the database already
    const receiptExists = await execute<Array<{ receiptId: IReceipt['receipt_id'] }>>(ReceiptQueries.FindReceipt, [
      Receipt.receiptId
    ]);

    if (receiptExists.length > 0) {
      throw new CustomError('The receipt with the same id already created', 400, '');
    };
    const result = await execute<{ insertId: number }>(ReceiptQueries.AddReceipt, [
      Receipt.organization_id,
      Receipt.unit_id,
      Receipt.user_id,
      receiptData.receipt.receiptId,
      receiptData.receipt.ico,
      receiptData.receipt.cashRegisterCode,
      moment(receiptData.receipt.issueDate, "DD.MM.YYYY HH:mm:ss").utc().format("YYYY-MM-DD HH:mm:ss"),
      moment(receiptData.receipt.createDate, "DD.MM.YYYY HH:mm:ss").utc().format("YYYY-MM-DD HH:mm:ss"),
      receiptData.receipt.customerId,
      receiptData.receipt.dic,
      receiptData.receipt.icDph,
      receiptData.receipt.invoiceNumber,
      receiptData.receipt.okp,
      receiptData.receipt.paragon,
      receiptData.receipt.paragonNumber,
      receiptData.receipt.pkp,
      receiptData.receipt.receiptNumber,
      receiptData.receipt.type,
      receiptData.receipt.taxBaseBasic,
      receiptData.receipt.taxBaseReduced,
      receiptData.receipt.totalPrice,
      receiptData.receipt.freeTaxAmount,
      receiptData.receipt.vatAmountBasic,
      receiptData.receipt.vatAmountReduced,
      receiptData.receipt.vatRateBasic,
      receiptData.receipt.vatRateReduced
    ]);

    return result.insertId;

  } catch (error) {
    throw error;
  }
};


/**
 * gets Receipt record by Id
 */
export const getReceiptById = async (receiptId: IReceipt['receipt_id']) => {
  const result = await execute<IReceipt[]>(ReceiptQueries.GetReceiptById, [receiptId]);
  
  //updating the time from database values in UTC to local server time
  result[0].issueDate = moment(result[0].issueDate).local().format("DD-MM-YYYY HH:mm:ss");
  result[0].createDate = moment(result[0].createDate).local().format("DD-MM-YYYY HH:mm:ss");

  return result[0];
};

/**
 * gets Receipt records by dates from to
 */
 export const getReceiptByDate = async (from: IReceipt['issueDate'], to: IReceipt['issueDate']) => {
  const result = await execute<IReceipt[]>(ReceiptQueries.GetReceiptByDate, [from, to]);
  
  
  return result;
};