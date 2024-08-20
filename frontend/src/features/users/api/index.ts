import axios from '~utils/axiosConfig';
import { IUser, GetUsersParams, GetUsersResponse } from '~users/types';
import { compressUploadFile } from '~utils/files';

export const getUsers = async (params: GetUsersParams): Promise<GetUsersResponse> => {
  const response = await axios.get('/api/users', { params });
  return response.data;
};

export const createUser = async (user: Omit<IUser, '_id'>): Promise<IUser> => {
  const response = await axios.post<IUser>(`/api/users`, user);
  return response.data;
};

export const updateUser = async (user: IUser, newProfilePicture?: File): Promise<IUser> => {
  if (newProfilePicture) {
    try {
      user.profilePicture = await uploadFile(newProfilePicture);
    } catch (error) {
      console.error('Failed to upload new profile picture:', error);
      throw new Error('Failed to upload new profile picture');
    }
  }
  const response = await axios.put<IUser>(`/api/users/${user._id}`, user);
  return response.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await axios.delete(`/api/users/${userId}`);
};

export const uploadFile = async (file: File): Promise<string> => {
  console.log('uploadFile client side')
  try {
    // Compress files before upload
    const compressedFile = await compressUploadFile(file);
    console.log(compressedFile)

    // Prepare data for upload
    const formData = new FormData();
    formData.append('file', compressedFile);

    // Upload file
    const response = await axios.post<{ fileUrl: string }>('/api/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(response.data)
    return response.data.fileUrl;
  } catch (error) {
    throw new Error('Failed to upload file');
  }
};
