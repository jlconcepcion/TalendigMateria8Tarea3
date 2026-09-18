import { useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Productos</h1>
        {isAuthenticated && (
          <button type="button" onClick={logout}>
            Cerrar sesión
          </button>
        )}
      </header>

      <main className="app-main">
        <section>
          <h2>Listado</h2>
          <ProductList />
        </section>

        <section>{isAuthenticated ? <ProductForm /> : <LoginForm />}</section>
      </main>
    </div>
  );
}

export default App;
