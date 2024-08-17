
export interface IUser {
  _id: string;
  email: string;
  password: string;
  isOnline: boolean;
  validatePassword(password: string): Promise<boolean>;
}

export interface GetUsersResponse {
  users: IUser[];
  totalUsers: number;
  currentPage: number;
  totalPages: number;
};

export interface GetUsersParams {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
}