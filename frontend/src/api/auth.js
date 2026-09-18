import apiClient from './client';

export const login = async ({ username, password }) => {
  const { data } = await apiClient.post('/login', { username, password });
  return data;
};
