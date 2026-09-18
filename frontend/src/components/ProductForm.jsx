import { useCreateProduct } from '../hooks/useCreateProduct';

export default function ProductForm() {
  const {
    register,
    onSubmit,
    errors,
    isPending,
    isError,
    isSuccess,
    errorMessage,
  } = useCreateProduct();

  return (
    <form onSubmit={onSubmit} className="card">
      <h2>Nuevo producto</h2>

      <label>
        Nombre
        <input {...register('name')} />
      </label>
      {errors.name && <p className="error">{errors.name.message}</p>}

      <label>
        Precio
        <input type="number" step="0.01" {...register('price')} />
      </label>
      {errors.price && <p className="error">{errors.price.message}</p>}

      <label>
        Stock
        <input type="number" step="1" {...register('stock')} />
      </label>
      {errors.stock && <p className="error">{errors.stock.message}</p>}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Guardando...' : 'Crear producto'}
      </button>

      {isError && <p className="error">{errorMessage}</p>}
      {isSuccess && <p className="success">Producto creado correctamente.</p>}
    </form>
  );
}
