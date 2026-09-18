import { useProducts } from '../hooks/useProducts';

export default function ProductList() {
  const { products, isLoading, isError, error } = useProducts();

  if (isLoading) return <p>Cargando productos...</p>;
  if (isError) return <p className="error">Error al cargar productos: {error?.message}</p>;
  if (!products?.length) return <p>No hay productos cargados.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>${Number(product.price).toFixed(2)}</td>
            <td>{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
