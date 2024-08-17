import axios from '~utils/axiosConfig';
import { GetUsersParams, GetUsersResponse } from '~users/types';

export const getUsers = async (params: GetUsersParams): Promise<GetUsersResponse> => {
  const response = await axios.get('/api/users', { params });
  return response.data;
};