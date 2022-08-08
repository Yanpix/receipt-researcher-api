import { Router } from 'express';
import * as Controller from './user.controller';
import * as Auth from './../middlewares/auth.middleware';

const router = Router();

router
  .route('/')
  .get(
    Auth.authorize(['getUsers']),
    Controller.getUsers
  );

router
  .route('/:userId')
  .get(
    Auth.authorize(['getUser']),
    Controller.getUserById
  );

router
  .route('/')
  .post(
    Auth.authorize(['addUser']),
    Controller.addUser
  );

router
  .route('/:userId')
  .patch(
    Auth.authorize(['updateUser']),
    Controller.updateUserById
  );

router
  .route('/:userId')
  .delete(
    Auth.authorize(['deleteUser']),
    Controller.deleteUserById
  );

export default router;