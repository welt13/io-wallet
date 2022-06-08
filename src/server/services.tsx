import apiClient from './api';

export const execute = async (method: string, url: string, data?: object) => apiClient({
  method,
  url,
  data,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then((req) => req.data)
  .catch((err) => {
    throw err.response;
  });
