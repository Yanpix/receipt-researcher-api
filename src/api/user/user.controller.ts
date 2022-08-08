import { Request, RequestHandler, Response } from 'express';
import * as UserService from './user.service';
import { CustomError } from './../models/custom-error.model';
import {
  IUser,
  IGetUserReq,
  IAddUserReq,
  IUpdateUserReq,
  IDeleteUserReq
} from './user.model';

/**
 * Get Users records
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore


export const getUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const Users = await UserService.getUsers();
    
    res.status(200).json({ Users });
  } catch (error) {
    console.error('[Users.controller][getUsers][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching Users'
    });
  }
};

/**
 * Get User record based on id provided
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore

export const getUserById: RequestHandler = async (req: IGetUserReq, res: Response) => {
  try {
    const User = await UserService.getUserById(req.params.userId);

    res.status(200).json({ User });
  } catch (error) {
    console.error('[Users.controller][getUserById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching User'
    });
  }
};


/**
 * Inserts a new User record based
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore

export const addUser: RequestHandler = async (req: IAddUserReq, res: Response) => {
  try {
    const result = await UserService.insertUser(req.body);

    res.status(200).json({
      result
    });
  } catch (error) {
    console.error('[Users.controller][addUser][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when adding new User'
    });
  }
};

/**
 * Updates existing User record
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore
export const updateUserById: RequestHandler = async (req: IUpdateUserReq, res: Response) => {
  try {
    const result = await UserService.updateUser({ ...req.body, user_id: req.params.userId });

    res.status(200).json({
      result
    });
  } catch (error) {
    console.error('[Users.controller][updateUserById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when updating User'
    });
  }
};

/**
 * deletes a User
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore

export const deleteUserById: RequestHandler = async (req: IDeleteUserReq, res: Response) => {
  try {
    const result = await UserService.deleteUser(req.params.userId);

    res.status(200).json({
      result
    });
  } catch (error) {
    console.error('[Users.controller][deleteUserById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when deleting User'
    });
  }
};

