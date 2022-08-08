//import { Verify } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { validateToken } from './../utils/jwt.utils';
import { TokenExpiredError } from 'jsonwebtoken';
import { CustomError } from './../models/custom-error.model';

/**
 * middleware to check whether user has access to a specific endpoint 
 * 
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 */
export const authorize = (allowedAccessTypes: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    let jwt = req.headers.authorization;

    // verify request has token
    if (!jwt) { throw new CustomError('Invalid token', 401, 'No JWT token detected or no any token provided'); }

    // remove Bearer if using Bearer Authorization mechanism
    if (jwt.toLowerCase().startsWith('bearer')) {
      jwt = jwt.slice('bearer'.length).trim();
    }

    // verify token hasn't expired yet
    const decodedToken = await validateToken(jwt);

    let hasAccessToEndpoint = false;
    let hasAccessToEndpointById = true;

    for (let i = 0; i < decodedToken.accessTypes.length; i++) {

      let at = decodedToken.accessTypes[i];

      if (at.endsWith(':userId')) {
        at = at.slice(0, at.length - ':userId'.length).trim();
        if (parseInt(req.params.userId) == decodedToken.userId) {
          hasAccessToEndpointById = true;
        } else {
          hasAccessToEndpointById = false;
        }
      };

      for (let j = 0; j < allowedAccessTypes.length; j++) {
        if (at === allowedAccessTypes[j]) {
          hasAccessToEndpoint = true;
        }
      }

    };

    if (!hasAccessToEndpoint) {
      throw new CustomError('Not enough privilege to access endpoint', 401, 'User has no access to the queried endpoint');
    } else if (!hasAccessToEndpointById && hasAccessToEndpoint) {
      throw new CustomError('Wrong user id', 401, 'User id used in query is not equal to user id in the database');
    }

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError && error.name === 'TokenExpiredError') {
      error = new CustomError('Expired token', 401, 'The time of the token is up');
    }
    if (error instanceof CustomError) {
      console.error('[Auth.middleware][Authorize][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
      res.status(error.status).json({ message: error.message });
    } else {
      console.error('[Auth.middleware][Authorize][Error] ', JSON.stringify({ message: 'Failed to authenticate user' }));
      res.status(500).json({ message: 'Failed to authenticate user' });
    }
  }
};



//middleware to get a user id from jwt token
export const getUserIdFromToken = async (jwt: string) => {
  try {
    // verify request has token
    if (!jwt) { throw new CustomError('Invalid token', 401, 'No JWT token detected or no any token provided'); }

    // remove Bearer if using Bearer Authorization mechanism
    if (jwt.toLowerCase().startsWith('bearer')) {
      jwt = jwt.slice('bearer'.length).trim();
    }

    // verify token hasn't expired yet
    const decodedToken = await validateToken(jwt);
    return decodedToken.userId;
  } catch (error) {
    if (error instanceof TokenExpiredError && error.name === 'TokenExpiredError') {
      error = new CustomError('Expired token', 401, 'The time of the token is up');
    }
    if (error instanceof CustomError) {
      console.error('[Auth.middleware][getUserIdFromToken][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    } else {
      console.error('[Auth.middleware][getUserIdFromToken][Error] ', JSON.stringify({ message: 'Failed to authenticate user' }));
    }
  }
};
