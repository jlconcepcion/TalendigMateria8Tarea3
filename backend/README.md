# Products API (backend)

API REST desarrollada con Node.js, Express, Zod y Mongoose (MongoDB), con autenticación JWT para proteger la creación de productos.

## Arquitectura (Tarea 3 — Hexagonal / Capas por Dominio)

El backend está organizado por dominios de negocio y desacoplado en 3 capas principales:
- **Transporte / Rutas y Controladores (`product.routes.js`, `product.controller.js`)**: Manejan las peticiones HTTP entrantes, aplican middlewares y devuelven respuestas HTTP formateadas.
- **Casos de Uso / Servicio (`product.service.js`)**: Lógica de negocio pura. No importa Express ni el cliente de base de datos directamente, interactuando únicamente a través del repositorio.
- **Repositorio (`product.repository.js`)**: Encapsula las operaciones de acceso a datos y consultas de Mongoose.

Estructura de archivos:
```text
src/
├── app.js
├── server.js
├── auth/
│   ├── auth.controller.js
│   ├── auth.routes.js
│   ├── auth.schema.js
│   └── auth.service.js
├── products/
│   ├── product.controller.js
│   ├── product.model.js
│   ├── product.repository.js
│   ├── product.routes.js
│   ├── product.schema.js
│   └── product.service.js
├── middlewares/
│   ├── auth.middleware.js
│   └── validate.middleware.js
└── config/
    └── db.js
```

## Configuración

1. Instalar dependencias:
   ```
   npm install
   ```
2. Copiar `.env.example` a `.env` y completar:
   - `MONGODB_URI`: cadena de conexión de MongoDB.
   - `JWT_SECRET`: secreto usado para firmar los JWT.
   - `AUTH_USERNAME` / `AUTH_PASSWORD`: credenciales hardcodeadas para el login de esta etapa (default `admin` / `admin123`).

## Ejecutar

- Desarrollo: `npm run dev`
- Producción: `npm start`
- Pruebas automatizadas (CRUD + login + protección de POST): `node test-api.js`

## Endpoints

| Método | Ruta            | Auth requerida | Descripción                    |
|--------|-----------------|:--------------:|---------------------------------|
| POST   | `/login`        | No             | Devuelve un JWT si las credenciales son válidas |
| GET    | `/products`     | No             | Lista todos los productos       |
| GET    | `/products/:id` | No             | Obtiene un producto por id      |
| POST   | `/products`     | **Sí**         | Crea un producto (requiere `Authorization: Bearer <token>`) |
| PUT    | `/products/:id` | No             | Actualiza un producto           |
| DELETE | `/products/:id` | No             | Elimina un producto             |

### Ejemplo de login

```
POST /login
Content-Type: application/json

{ "username": "admin", "password": "admin123" }
```

Respuesta:
```json
{ "token": "eyJhbGciOi..." }
```

### Ejemplo de creación de producto autenticada

```
POST /products
Content-Type: application/json
Authorization: Bearer <token>

{ "name": "Mouse", "price": 15.5, "stock": 10 }
```

Sin el header `Authorization` (o con un token inválido/expirado), la respuesta es `401`.
