import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api/products';
import { useAuth } from '../context/AuthContext';

const productSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  price: z.coerce.number().positive('El precio debe ser positivo'),
  stock: z.coerce
    .number()
    .int('El stock debe ser un entero')
    .min(0, 'El stock no puede ser negativo'),
});

export function useCreateProduct() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });

  const mutation = useMutation({
    mutationFn: (values) => createProduct(values, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      reset();
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    errorMessage: mutation.error?.response?.data?.error || 'Error al crear el producto',
    createProduct: mutation.mutate,
    reset,
  };
}
