import { Request } from 'express';
import { IUser } from '../user/user.model';

export interface IAuthUser extends IUser {
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
};

export interface ISignInUserReq extends Request< any, any, IAuthUser> { }
export interface ISignUpUserReq extends Request<any, any, IAuthUser> { }