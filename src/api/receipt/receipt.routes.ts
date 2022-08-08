import { Router } from 'express';
import * as Controller from './receipt.controller';
import * as Auth from './../middlewares/auth.middleware';

const router = Router();

router
  .route('/')
  .post(
    Auth.authorize(['addReceipt']),
    Controller.addReceipt
  );

  router
  .route('/:receiptId')
  .get(
    Auth.authorize(['getReceiptById']),
    Controller.getReceiptById
  );

export default router;