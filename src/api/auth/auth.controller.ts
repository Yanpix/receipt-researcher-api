import { RequestHandler, Response } from 'express';
import * as AuthService from './../auth/auth.service';
import { CustomError } from './../models/custom-error.model';

/**
 * User authentication SignIn
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore

export const signIn: RequestHandler = async (req: ISignInUserReq, res: Response) => {
  try {
    const result = await AuthService.signIn(req.body);
    res.status(200).json({
      token: result.token
    });
  } catch (error) {
    console.error('[Auth.controller][SignIn][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });
    } else
      res.status(500).json({ message: 'There was an error when signing in' });
  }
};


/**
 * New user SignUp
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore

export const signUp: RequestHandler = async (req: ISignUpUserReq, res: Response) => {
  try {
    const result = await AuthService.signUp(req.body);

    res.status(200).json({
      result
    });
  } catch (error) {
    console.error('[Auth.controller][SignUpUser][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when sign up a new User'
    });
  }
};