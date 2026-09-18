# Tarea 3 — Refactor arquitectónico

Monorepo con la API de productos (backend) y su interfaz en React (frontend), refactorizados bajo principios de **arquitectura hexagonal en capas** en el backend y el patrón **MVVM (Componente + Hook)** en el frontend.

- [`/backend`](./backend): API REST (Node.js, Express, Mongoose, Zod) estructurada por dominios y capas desacopladas.
- [`/frontend`](./frontend): SPA en React (Vite, TanStack Query, React Hook Form + Zod) con componentes de presentación desacoplados de la lógica mediante custom hooks.

---

## Refactor Arquitectónico (Tarea 3)

### 1. Backend: Arquitectura en capas y empaquetado por dominio
- **Qué se reorganizó**:
  - Se eliminó la estructura plana por tipos (`controllers/`, `models/`, `routes/`, `services/`, `schemas/`).
  - Se agruparon los archivos por dominio de negocio:
    - `src/products/`: `product.routes.js`, `product.controller.js`, `product.service.js`, `product.repository.js`, `product.model.js`, `product.schema.js`.
    - `src/auth/`: `auth.routes.js`, `auth.controller.js`, `auth.service.js`, `auth.schema.js`.
  - Se separó el flujo en 3 capas explícitas:
    1. **Rutas y Controladores** (Transporte HTTP): Reciben el request, gestionan middlewares y devuelven respuestas HTTP.
    2. **Casos de uso / Servicios** (`product.service.js`): Contienen la lógica de negocio pura. **No importan Express ni el cliente de base de datos (Mongoose)**.
    3. **Repositorio** (`product.repository.js`): Es la única capa que interactúa directamente con el modelo de base de datos.
- **Por qué**:
  - **Aislamiento de la lógica de negocio**: Las reglas de negocio no quedan acopladas a detalles de infraestructura como Express o Mongoose. Si en el futuro se migra a otro framework HTTP (ej. Fastify) o a otro ORM/ODM (ej. Prisma, TypeORM, PostgreSQL), los casos de uso permanecen inalterados.
  - **Alta cohesión por dominio**: Todo lo relativo al concepto "producto" está en un solo lugar, facilitando la navegación y el mantenimiento del código.
  - **Facilidad para pruebas**: Los casos de uso pueden probarse unitariamente de forma rápida inyectando repositorios simulados en memoria sin necesidad de levantar un servidor web ni una base de datos real.

### 2. Frontend: Patrón MVVM con Custom Hooks
- **Qué se reorganizó**:
  - Se extrajo toda la lógica de estado, llamadas asíncronas a la API, mutaciones y validaciones de formularios fuera de los componentes hacia **Custom Hooks** (`src/hooks/`):
    - `useProducts`: Encapsula la consulta de productos con TanStack Query (`useQuery`), gestionando estados de carga (`isLoading`), error (`isError`) y datos (`products`).
    - `useCreateProduct`: Encapsula el manejo del formulario (React Hook Form + Zod), la autenticación (`useAuth`), la mutación asíncrona de creación (`useMutation`) y la invalidación de la caché de queries.
  - Los componentes `ProductList` y `ProductForm` pasaron a ser componentes exclusivamente presentacionales (UI).
- **Por qué**:
  - **Separación de responsabilidades (SoC)**: El componente visual solo se ocupa de renderizar JSX y recibir interacciones del usuario; no sabe si los datos vienen de una API REST, TanStack Query o localStorage.
  - **Reutilización y mantenimiento**: La lógica de negocio y gestión de estado puede reutilizarse o modificarse sin tocar la interfaz de usuario.
  - **Código más declarativo y legible**: Los componentes reducen drásticamente su tamaño y complejidad visual al delegar el comportamiento a los hooks.

---

## Cómo correr el proyecto

1. Backend (puerto 3000 por defecto):
   ```bash
   cd backend
   npm install
   # completar backend/.env a partir de backend/.env.example
   npm run dev
   ```
   Para ejecutar las pruebas automatizadas del backend:
   ```bash
   node test-api.js
   ```

2. Frontend (puerto 5173 por defecto):
   ```bash
   cd frontend
   npm install
   # completar frontend/.env a partir de frontend/.env.example (VITE_API_URL)
   npm run dev
   ```

3. Abrir `http://localhost:5173`. El listado de productos es público; para crear un producto hay que iniciar sesión con las credenciales configuradas en el backend (por defecto `admin` / `admin123`).

Más detalle de cada parte en `backend/README.md` y `frontend/README.md`.
