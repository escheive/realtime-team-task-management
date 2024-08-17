
export interface IUser {
  _id: string;
  email: string;
  password: string;
  username: string;
  fullName: string;
  profilePicture?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  roles: string[];
  status: 'Active' | 'Suspended' | 'Deactivated';
  lastLogin?: Date;
  address: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  activityLog: {
    action: string;
    timestamp: Date;
  }[];
  isOnline?: boolean;
  notifications?: boolean;
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