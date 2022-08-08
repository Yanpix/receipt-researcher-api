import { execute } from "./../utils/mysql.connector";
import { ItemQueries } from "./item.queries";
import { IItem } from "./item.model";

/**
 * adds a new active Item record
 */
export const insertItem = async (Items: [IItem], receiptId: number) => {
  try {

    Items.forEach((element) => {
      element.receipt_id = receiptId;
    });

    let params: string = '';

    Items.forEach((element) => {
      params = params + '(' + element.receipt_id + ",'" + element.name + "','" + element.itemType + "'," + element.quantity + ',' + element.vatRate + ',' + element.price + '),';
    });

    params = params.substring(0,params.length-1);
    params = params + ';';

    let sql_statement = ItemQueries.AddItem + params;
    
    const item = await execute<{ affectedRows: number }>(sql_statement,'');

    return item.affectedRows;

  } catch (error) {
    throw error;
  }
};

/**
 * gets Items by receipt_id
 */
 export const getItems = async (receiptId: IItem['receipt_id']) => {
  return execute<IItem[]>(ItemQueries.GetItems, [receiptId]);
};