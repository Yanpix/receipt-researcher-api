export const ItemQueries = {

  AddItem:
    `INSERT INTO item ( receipt_id, name, itemType, quantity, vatRate, price ) VALUES `,

  GetItems:
    `SELECT * FROM item WHERE receipt_id = ?`
};