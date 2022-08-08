import { Request } from 'express';

export interface IUser {
  user_id?: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  isActive: number;
};

export interface IGetUserReq extends Request<{ userId: IUser['user_id'] }> { }
export interface IAddUserReq extends Request<any, any, IUser> { }
export interface IUpdateUserReq extends Request<{ userId: IUser['user_id'] }, any, IUser> { }
export interface IDeleteUserReq extends Request<{ userId: IUser['user_id'] }> { }