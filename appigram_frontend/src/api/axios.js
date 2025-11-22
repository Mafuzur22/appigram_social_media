import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/',
  withCredentials: false // we're using JWT in Authorization header
});

export const apiRoot = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_ROOT || 'http://localhost:8000/',
  withCredentials: false,
});

// Request interceptor: attach access token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: auto-refresh access token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh');
      if (!refreshToken) return Promise.reject(error);

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/'}auth/token/refresh/`,
          { refresh: refreshToken }
        );

        const newAccess = res.data.access;
        localStorage.setItem('access', newAccess);

        // Update the header and retry original request
        originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (err) {
        // Refresh token invalid/expired: force logout
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.reload(); // optional: redirect to login
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
