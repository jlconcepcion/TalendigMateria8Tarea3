import { Product } from './product.model.js';

export const create = async (productData) => {
  return await Product.create(productData);
};

export const findAll = async () => {
  return await Product.find();
};

export const findById = async (id) => {
  return await Product.findById(id);
};

export const update = async (id, productData) => {
  return await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });
};

export const deleteById = async (id) => {
  return await Product.findByIdAndDelete(id);
};
