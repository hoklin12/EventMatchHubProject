import axios, { AxiosInstance } from 'axios';

const apiClientJsonData: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL, // Updated to use NEXT_PUBLIC_ prefix for frontend env variables
  withCredentials: false,
  headers: (() => {
    // Ensure localStorage is accessed only in the browser environment
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
    }

    return headers;
  })(),
});

const apiClientFormData: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL, // Updated to use NEXT_PUBLIC_ prefix for frontend env variables
  withCredentials: false,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Optional: interceptors for auth, error handling
apiClientJsonData.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error.response?.data || error.message);
    return Promise.reject(error);
  }
);

apiClientFormData.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export { apiClientJsonData, apiClientFormData };
