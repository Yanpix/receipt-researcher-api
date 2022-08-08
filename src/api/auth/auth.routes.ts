import { Router } from 'express';
import * as Controller from './auth.controller';

const router = Router();

router
  .route('/signin')
  .post(
    Controller.signIn
  );

router
  .route('/signup')
  .post(
    Controller.signUp
  );


export default router;