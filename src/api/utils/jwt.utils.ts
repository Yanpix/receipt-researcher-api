import { JwtPayload, sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

/**
 * generates JWT used for local testing
 */

export function generateToken(payload: string | JwtPayload) {
  // read private key value
  const privateKey = {
  key: fs.readFileSync(path.join(__dirname, './../../../dist/private.pem')),
  passphrase: "put_the_pass_phrase_here"
  };

  const signInOptions: SignOptions = {
    // RS256 uses a public/private key pair. The API provides the private key 
    // to generate the JWT. The client gets a public key to validate the 
    // signature
    algorithm: 'RS256',
    expiresIn: '1h'
  };

  // generate JWT
  return sign(payload, privateKey, signInOptions);
};

interface TokenPayload {
  exp: number;
  accessTypes: string[];
  name: string;
  userId: number;
}

/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
export function validateToken(token: string): Promise<TokenPayload> {
  const publicKey = fs.readFileSync(path.join(__dirname, './../../../public.pem'));

  const verifyOptions: VerifyOptions = {
    algorithms: ['RS256']
  };

  return new Promise((resolve, reject) => {
    verify(token, publicKey, verifyOptions, (error, decoded) => {
      if (error) return reject(error);
      resolve(decoded as TokenPayload);
    })
  });
}