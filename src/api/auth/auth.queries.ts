export const AuthQueries = {

  SignIn:
    `SELECT user_id, firstname, lastname, email, password, role FROM user as t WHERE email = ? and isActive = 1`,

  SignUp:
    `INSERT INTO user (email, firstname, lastname, password, isActive) VALUES (?,?,?,?,1);`
};