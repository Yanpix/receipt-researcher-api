export const ReceiptQueries = {

  AddReceipt:
    `INSERT INTO receipt ( organization_id, unit_id, user_id, receiptId, ico, cashRegisterCode, issueDate, createDate, customerId, dic, icDph, invoiceNumber, okp, paragon, paragonNumber, pkp, receiptNumber, type, taxBaseBasic, taxBaseReduced, totalPrice, freeTaxAmount, vatAmountBasic, vatAmountReduced, vatRateBasic, vatRateReduced ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,

  FindReceipt:
    `SELECT receipt_id FROM receipt WHERE receiptId = ?;`,
  
  GetReceiptById:
    `SELECT * FROM receipt WHERE receipt_id = ?;`,
  
  GetReceiptByDate:
    `SELECT * FROM receipt WHERE (issueDate > ?) AND (issueDate < ?);`

};