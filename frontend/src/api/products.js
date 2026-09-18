import apiClient from './client';

export const getProducts = async () => {
  const { data } = await apiClient.get('/products');
  return data;
};

export const createProduct = async (product, token) => {
  const { data } = await apiClient.post('/products', product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
