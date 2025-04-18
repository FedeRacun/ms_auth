# Microservicio de Autenticación - Node.js + Supabase

## 📋 Descripción General

Este proyecto es un **microservicio de autenticación** construido en Node.js con TypeScript.  
Permite a usuarios:

- Registrarse (`/auth/register`)
- Iniciar sesión (`/auth/login`)
- Renovar su sesión (`/auth/refresh`)

El microservicio está preparado para ser **desplegado de manera independiente** y pensado para ser **fácilmente desacoplable** del proveedor actual (Supabase).

---

## 🏗️ Tecnologías Utilizadas

- **Node.js** — entorno de ejecución.
- **Express** — servidor HTTP.
- **TypeScript** — tipado estático seguro.
- **Supabase JS SDK** — proveedor BaaS actual (autenticación).
- **Zod** — validación de `req.body` en runtime.
- **Biome** — formateador, linter y type-checker.
- **pnpm** — manejador de paquetes rápido.
- **dotenv** — carga de variables de entorno.
- **tsconfig-paths** — soporte de alias en desarrollo.
- **Nodemon + ts-node** — hot reload para desarrollo.

---

## ⚙️ Estructura del Proyecto

```
src/
│
├── controllers/
│   └── auth.controller.ts      # Lógica HTTP
│
├── middlewares/
│   └── validate.middleware.ts  # Validaciones automáticas con Zod
│
├── routes/
│   └── auth.routes.ts          # Definición de endpoints
│
├── services/
│   ├── auth.service.ts         # Capa de autenticación desacoplada
│   └── supabase.service.ts     # Cliente de Supabase
│
├── utils/
│   └── responseHelper.ts       # Helpers para respuestas uniformes
│
├── validations/
│   └── auth.validation.ts      # Schemas de Zod y tipos inferidos
│
├── app.ts                      # Configuración principal de la app
└── server.ts                   # Entrada principal (levanta express)
```

---

## 📦 Variables de Entorno

Debés crear un archivo `.env` en la raíz basado en el `env.template`:

```env
PORT=3000
SUPABASE_URL=https://tuprojecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key-aqui
```

---

## 🚀 Cómo levantar el proyecto

1. Clonar el repositorio:

```bash
git clone <repo-url>
cd ms_auth
```

2. Instalar dependencias:

```bash
pnpm install
```

3. Crear el archivo `.env` con tus credenciales de Supabase.

4. Correr el servidor en modo desarrollo:

```bash
pnpm run dev
```

✅ El servicio estará corriendo en:

```
http://localhost:3000
```

---

## 📚 Endpoints Disponibles

### POST `/auth/register`

**Crea un nuevo usuario.**

**Body esperado:**

```json
{
  "email": "usuario@correo.com",
  "password": "claveSegura123"
}
```

**Respuesta exitosa:**

```json
{
  "success": true,
  "data": {
    "user": { "id": "uuid", "email": "usuario@correo.com", ... }
  }
}
```

---

### POST `/auth/login`

**Inicia sesión de un usuario registrado.**

**Body esperado:**

```json
{
  "email": "usuario@correo.com",
  "password": "claveSegura123"
}
```

**Respuesta exitosa:**

```json
{
  "success": true,
  "data": {
    "access_token": "jwt",
    "refresh_token": "tokenDeRefresh",
    "user": { "id": "uuid", "email": "usuario@correo.com", ... }
  }
}
```

---

### POST `/auth/refresh`

**Renueva el `access_token` utilizando el `refresh_token`.**

**Body esperado:**

```json
{
  "refreshToken": "tokenDeRefresh"
}
```

**Respuesta exitosa:**

```json
{
  "success": true,
  "data": {
    "access_token": "nuevoJwt",
    "refresh_token": "nuevoRefreshToken"
  }
}
```

---

## 🛠️ Características Técnicas Importantes

- **Validación automática de inputs** usando Zod.
- **Respuestas homogéneas** (`success: true/false`) en toda la API.
- **Desacoplamiento total** de Supabase (fácil de migrar a otro proveedor en el futuro).
- **Tipado estricto** en todos los endpoints.
- **Preparado para multi-entorno** usando `.env`.

---

## ⚡ Posibles Mejoras Futuras

- Middleware global de manejo de errores (`ErrorHandler`).
- Capa de abstracción de errores (`AppError` class).
- Protección de rutas privadas (verificación de JWT en headers).
- Dockerización para despliegue.
- Automatización de tests de integración (Jest + Supertest).

---

## ✨ Autor

> Creado y documentado por **Federico Knispel** 🚀