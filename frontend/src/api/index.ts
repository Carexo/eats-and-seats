import axios from 'axios';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshToken();
        return client(originalRequest);
      } catch (error) {
        console.error('Token refresh failed:', error);
      }
    }

    return Promise.reject(error);
  },
);

const refreshToken = async () => {
  try {
    await client.get('/auth/refresh', { withCredentials: true });
  } catch (error) {
    console.error(error);
  }
};
