import axios from 'axios';
import { BASE_URL } from '@/config/constants-api';

const axiosClient = axios.create({ baseURL: BASE_URL });

// Request Interceptor
axiosClient.interceptors.request.use(
  async (config: any) => {
    config.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };

    // Add Bearer Token if it exists
    const token = localStorage.getItem('token');
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

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Handle success responses
    // if (response.status === 200 || response.status === 201) {
    //   // return response?.data; // Return only the data for cleaner usage
    //   return response; 
    // }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Handle unauthorized access (e.g., token expiration)
        console.warn('Token expired or unauthorized, redirecting to login...');
        document.cookie =
          'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('token');
        window.location.replace('/login');
      } else {
        console.error(
          `API Error: ${error.response.status} - ${error.response.statusText}`
        );
      }
    } else {
      console.error('Network/Server Error:', error.message);
    }

    // Re-throw the error for further handling
    return Promise.reject(error);
  }
);

export default axiosClient;
