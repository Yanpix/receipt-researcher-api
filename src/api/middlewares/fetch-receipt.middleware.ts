import axios from 'axios';
import { IReceipt } from '../receipt/receipt.model';

/**
 * middleware to get receipt data from tax portal API by receiptId 
 * 
 * @param receiptId Provide a Receipt.receiptId from receipt.model <- POST parameter
 */

export const getReceiptData = async (receiptId: IReceipt['receiptId']) => {
    // put the tax portal API here
    const response = await axios.post('', { receiptId: receiptId });
    return response.data;
};