export enum UserRole {
  Administrator = "administrator",
  Guest = "guest",
  User = "user"
}

export const AdministratorPermission = [
  'getUsers',
  'getUser',
  'addUser',
  'updateUser',
  'deleteUser',
  'addReceipt',
  'getReceiptById'
];

export const GuestPermission = [
  'getUser:userId'
];

export const UserPermission = [
  'getUser:userId',
  'updateUser:userId',
  'getReceiptById:userId'
];