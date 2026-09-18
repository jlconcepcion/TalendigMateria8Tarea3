import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const loginSchema = z.object({
  username: z.string().min(1, 'El usuario es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export default function LoginForm() {
  const { loginWithToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => loginWithToken(data.token),
  });

  const onSubmit = (values) => mutation.mutate(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <h2>Iniciar sesión</h2>

      <label>
        Usuario
        <input {...register('username')} autoComplete="username" />
      </label>
      {errors.username && <p className="error">{errors.username.message}</p>}

      <label>
        Contraseña
        <input type="password" {...register('password')} autoComplete="current-password" />
      </label>
      {errors.password && <p className="error">{errors.password.message}</p>}

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Ingresando...' : 'Ingresar'}
      </button>

      {mutation.isError && (
        <p className="error">
          {mutation.error?.response?.data?.error || 'Error al iniciar sesión'}
        </p>
      )}
    </form>
  );
}
