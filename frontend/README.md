# Products Frontend

Frontend en React (Vite) que consume la Products API. Usa TanStack Query para el listado, React Hook Form + Zod para los formularios, y un login con JWT para proteger la creación de productos.

## Configuración

1. Instalar dependencias:
   ```
   npm install
   ```
2. Copiar `.env.example` a `.env` y ajustar `VITE_API_URL` si el backend no corre en `http://localhost:3000`.

## Ejecutar

```
npm run dev
```

## Arquitectura (Tarea 3 — Patrón MVVM con Custom Hooks)

El frontend adopta el patrón MVVM desacoplando la UI (View) de la lógica de estado y mutación (ViewModel):
- **Custom Hooks (`src/hooks/`)**:
  - `useProducts`: Encapsula la obtención de productos con TanStack Query (`products`, `isLoading`, `isError`, `error`).
  - `useCreateProduct`: Encapsula el formulario con React Hook Form, validación Zod, obtención del token vía `useAuth`, mutación asíncrona de creación e invalidación de caché.
- **Componentes (`src/components/`)**:
  - `ProductList`: Componente puramente presentacional que consume `useProducts`.
  - `ProductForm`: Componente puramente presentacional que consume `useCreateProduct`.

## Funcionalidad

- **Listado de productos**: `ProductList` muestra el listado de productos, estados de carga y errores delegando la gestión a `useProducts`.
- **Login**: `LoginForm` envía usuario/contraseña a `POST /login` (React Hook Form + Zod) y guarda el JWT recibido en `localStorage` mediante `AuthContext`.
- **Crear producto**: Una vez logueado, `ProductForm` reemplaza al login y permite dar de alta un producto delegando el formulario y la mutación a `useCreateProduct`. Al crearlo, se invalida automáticamente la query de productos para refrescar el listado.
- Si no hay sesión iniciada, no se muestra el formulario de creación, solo el login.

Credenciales de prueba por defecto (configurables en el backend): `admin` / `admin123`.
