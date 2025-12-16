# Backend de E‑commerce (Express)

API REST para un backend de e‑commerce con:
- Autenticación con JWT
- Gestión de usuarios, productos, categorías y órdenes
- Pruebas con Jest/Supertest
- Logging con Winston (silencioso en tests)

## Requisitos
- Node.js 18+
- Cuenta de MongoDB Atlas (o Mongo local para desarrollo)

## Instalación
1. Clona el repositorio:
   git clone https://github.com/Guillorromostro/BKND2-ENTREGA1-Benitez.git
2. Instala dependencias:
   npm ci

## Configuración (MongoDB Atlas y variables de entorno)
1. Crea un archivo `.env` basado en `.env.example`.
2. En Atlas, crea un cluster y una base `ecommerce`. Genera un usuario y habilita acceso desde tu IP.
3. Copia el connection string SRV en `MONGODB_URI`.
4. Define `JWT_SECRET` (no lo publiques). Ajusta `COOKIE_*` según el entorno (en producción, `COOKIE_SECURE=true`).

## Scripts
- Desarrollo:
  - npm start
- Tests:
  - npx jest
  - o npm test (si está definido en package.json)

## Notas de seguridad
- Nunca publiques `.env` ni secretos.
- El JWT no incluye contraseña ni datos sensibles.
- Cookies marcadas como `httpOnly` y `secure` (en producción).