# Backend de E‑commerce (Express)

API REST para un backend de e‑commerce con:
- Autenticación con JWT
- Gestión de usuarios, productos, categorías y órdenes
- Pruebas con Jest/Supertest
- Logging con Winston (silencioso en tests)

## Requisitos
- Node.js 18+ (recomendado)
- npm

## Instalación
1. Clona el repositorio:
   git clone https://github.com/Guillorromostro/BKND2-ENTREGA1-Benitez.git
2. Instala dependencias:
   npm ci
   # o
   npm install

## Configuración
Crea un archivo .env en la raíz con tus valores. Ejemplo:

PORT=3000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=supersecret
LOG_LEVEL=info
NODE_ENV=development

Notas:
- LOG_LEVEL: niveles típicos de Winston (error, warn, info, http, verbose, debug, silly).
- Durante los tests (NODE_ENV=test), el logger no imprime por consola.

## Ejecución
- Desarrollo/producción (según tus scripts):
  - npm start
  - o: node src/app.js
- Pruebas:
  - npx jest
  - o: npm test (si defines el script en package.json)

## Endpoints principales (referencia)
- Auth:
  - POST /api/auth/register
  - POST /api/auth/login
- Usuarios:
  - GET /api/users
  - POST /api/users
  - (puede incluir más rutas según permisos/roles)
- Productos:
  - GET /api/products
  - POST /api/products
- Categorías:
  - GET /api/categories
  - POST /api/categories
- Órdenes:
  - GET /api/orders
  - POST /api/orders

Las rutas exactas pueden variar según tu implementación.

## Estructura del proyecto
- src/
  - app.js
  - controllers/
  - models/
  - services/
  - repositories/
  - routes/
  - middlewares/
  - utils/
    - logger.js
- test/
  - unit/
  - integration/
- jest.config.js, jest.setup.js, jest.teardown.js

## Logging
- Winston a consola por defecto.
- En tests (NODE_ENV=test) no se imprime.
- Puedes configurar niveles con LOG_LEVEL.
- Los archivos de log comunes (combined.log, error.log) están ignorados en .gitignore.

## Scripts útiles (sugeridos)
En package.json puedes añadir:
"scripts": {
  "start": "node src/app.js",
  "test": "jest --runInBand"
}

## Contribución
- Ejecuta las pruebas antes de hacer commit: npx jest
- Sigue el estilo existente y agrega pruebas para nuevas funcionalidades.