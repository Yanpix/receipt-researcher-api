import { execute } from "./../utils/mysql.connector";
import { generateToken } from './../utils/jwt.utils';
import { AuthQueries } from "./auth.queries";
import { IAuthUser } from "./auth.model";
import * as RBAC from './../user/user.permissions';
import { CustomError } from './../models/custom-error.model';
import bcrypt from 'bcrypt';

/**
 * signIn
 */
export const signIn = async (AuthUser: IAuthUser) => {
  try {
    const userData = await execute<Array<IAuthUser>>(AuthQueries.SignIn, [AuthUser.email]);

    if (userData.length == 0) {
      
      
    };

    const isMatch = bcrypt.compareSync(AuthUser.password, userData[0].password);

    let at: string[] = [];

    if (userData[0].role === RBAC.UserRole.Administrator) {
      at = RBAC.AdministratorPermission;
    }

    if (userData[0].role === RBAC.UserRole.Guest) {
      at = RBAC.GuestPermission;
    }

    if (userData[0].role === RBAC.UserRole.User) {
      at = RBAC.UserPermission;
    }

    if (isMatch) {
      const token = generateToken(
        {
          name: userData[0].firstname + ' ' + userData[0].lastname,
          userId: userData[0].user_id,
          accessTypes: at
        }
      )

      return { token: token };
    } else {
      throw new CustomError('Password is not correct', 401, '');
    }

  } catch (error) {
    throw error;
  }
};


/**
 * signUp
 */
export const signUp = async (AuthUser: IAuthUser) => {
  try {
    
    const saltRounds = 8;
    AuthUser.password = await bcrypt.hash(AuthUser.password, saltRounds);
    const result = await execute<{ affectedRows: number }>(AuthQueries.SignUp, [
      AuthUser.email,
      AuthUser.firstname,
      AuthUser.lastname,
      AuthUser.password
    ]);
    return result.affectedRows > 0;

  } catch (error) {
    throw error;
  }
};