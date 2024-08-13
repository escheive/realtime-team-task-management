import axios from 'axios';

export const refreshAccessToken = async () => {
  try {
    const response = await axios.post('/auth/refresh-token');
    const { accessToken } = response.data;
    localStorage.setItem('authToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};
