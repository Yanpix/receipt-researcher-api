export const UserQueries = {

  GetUsers:
    `SELECT  user_id, email, firstname, lastname, password, isActive FROM user as t WHERE isActive = 1`,

  GetUserById:
    `SELECT user_id, email, firstname, lastname, password, isActive FROM user as t WHERE user_id = ?`,

  AddUser:
    `INSERT INTO user (email, firstname, lastname, password, isActive) VALUES (?,?,?,?,1);`,

  UpdateUserById:
    `UPDATE user SET email = ?, firstname = ?, lastname = ?, password = ? WHERE user_id = ?`,

  DeleteUserById:
    `UPDATE user SET isActive = false WHERE user_id = ?`
};