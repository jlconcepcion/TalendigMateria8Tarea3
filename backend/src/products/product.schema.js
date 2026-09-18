import { z } from 'zod';

export const productSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }).min(1, 'Name is required'),
  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  }).positive('Price must be positive'),
  stock: z.number({
    required_error: 'Stock is required',
    invalid_type_error: 'Stock must be a number',
  }).int('Stock must be an integer').min(0, 'Stock cannot be negative'),
});
