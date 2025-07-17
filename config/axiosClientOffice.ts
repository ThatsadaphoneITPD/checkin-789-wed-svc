import axios from 'axios';
import { EOFFICE_API_SVC } from '@/config/constants-api';

const axiosClientEoffice = axios.create({ baseURL: EOFFICE_API_SVC });

// Request Interceptor Eoffice
axiosClientEoffice.interceptors.request.use(
  async (config: any) => {
    config.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };

    // Add Bearer Token if it exists
    const token = localStorage.getItem('eoffice_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);


export default axiosClientEoffice;