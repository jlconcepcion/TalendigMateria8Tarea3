import * as productRepository from './product.repository.js';

/**
 * Casos de uso de productos (Lógica de negocio pura).
 * No depende de Express ni del cliente de base de datos (Mongoose).
 */

export const createProduct = async (productData, repository = productRepository) => {
  return await repository.create(productData);
};

export const getAllProducts = async (repository = productRepository) => {
  return await repository.findAll();
};

export const getProductById = async (id, repository = productRepository) => {
  return await repository.findById(id);
};

export const updateProduct = async (id, productData, repository = productRepository) => {
  return await repository.update(id, productData);
};

export const deleteProduct = async (id, repository = productRepository) => {
  return await repository.deleteById(id);
};
