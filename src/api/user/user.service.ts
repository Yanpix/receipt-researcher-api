import { execute } from "./../utils/mysql.connector";

import { UserQueries } from "./user.queries";
import { IUser } from "./user.model";

/**
 * gets Users
 */
export const getUsers = async () => {
  return execute<IUser[]>(UserQueries.GetUsers, []);
};



/**
 * gets a User based on id provided
 */
export const getUserById = async (userId: IUser['user_id']) => {
  return execute<IUser>(UserQueries.GetUserById, [userId]);
};

/**
 * adds a new active User record
 */
export const insertUser = async (User: IUser) => {
  const result = await execute<{ affectedRows: number }>(UserQueries.AddUser, [
    User.email,
    User.firstname,
    User.lastname,
    User.password
  ]);
  return result.affectedRows > 0;
};

/**
 * updates User information based on the id provided 
 */
export const updateUser = async (User: IUser) => {
  const result = await execute<{ affectedRows: number }>(UserQueries.UpdateUserById, [
    User.email,
    User.firstname,
    User.lastname,
    User.password,
    User.user_id
  ]);
  return result.affectedRows > 0;
};

/**
 * updates User information based on the id provided 
 */
export const deleteUser = async (userId: IUser['user_id']) => {
  const result = await execute<{ affectedRows: number }>(UserQueries.DeleteUserById, [
    userId
  ]);
  return result.affectedRows > 0;
};
