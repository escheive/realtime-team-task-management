
export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  status?: string;
  lastLogin?: Date;
  isOnline: boolean;
}

export interface PaginatedUsers {
  users: IUser[];
  totalPages: number;
  currentPage: number;
  totalUsers: number;
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