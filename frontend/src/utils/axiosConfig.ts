import axios, { AxiosError } from 'axios';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const delayRetry = (ms: number | undefined) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const refreshAccessToken = async () => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const response = await axios.post('/api/auth/refresh-token', null, {
      withCredentials: true,
    });

    const { accessToken } = response.data;

    // Update localStorage with the new accessToken
    localStorage.setItem('authToken', accessToken);
    
    processQueue(null, accessToken);

    return accessToken;
  } catch (error) {
    const axiosError = error as AxiosError; // Type assertion

    processQueue(error, null);

    // Handle 401 by logging out the user and redirecting to login
    if (axiosError && axiosError.response && axiosError.response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/auth/login';
    }
    throw error;
  } finally {
    isRefreshing = false;
  }
};

// Request interceptor to add the access token to headers
axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('authToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and retry
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Delay to prevent simultaneous retries
        await delayRetry(500);

        // Attempt to refresh the access token
        const newToken = await refreshAccessToken();

        // Ensure originalRequest retries with new accessToken
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        // Retry original request
        return axios(originalRequest);
      } catch (refreshError) {
        // Handle token refresh failure
        console.error('Token refresh failure:', refreshError);

        // Redirect user to login page
        // window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
