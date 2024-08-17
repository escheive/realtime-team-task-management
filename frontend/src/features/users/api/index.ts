import axios from '~utils/axiosConfig';
import { IUser, GetUsersParams, GetUsersResponse } from '~users/types';

export const getUsers = async (params: GetUsersParams): Promise<GetUsersResponse> => {
  const response = await axios.get('/api/users', { params });
  return response.data;
};

export const createUser = async (user: Omit<IUser, '_id'>): Promise<IUser> => {
  const response = await axios.post<IUser>(`/api/users`, user);
  return response.data;
};

export const updateUser = async (user: IUser): Promise<IUser> => {
  const response = await axios.put<IUser>(`/api/users/${user._id}`, user);
  return response.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await axios.delete(`/api/users/${userId}`);
};