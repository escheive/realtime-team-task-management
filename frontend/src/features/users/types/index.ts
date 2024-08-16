
export interface IUser {
  _id: string;
  email: string;
  password: string;
  isOnline: boolean;
  validatePassword(password: string): Promise<boolean>;
}