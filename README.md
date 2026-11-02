# Backend 2 - Segunda Pre-entrega: Registro y Autenticación Segura

Este repositorio corresponde a la segunda pre-entrega del curso de Backend en Coderhouse. El proyecto implementa el flujo de registro y autenticación de usuarios para una plataforma, integrando seguridad con **bcrypt**, persistencia de datos con **MongoDB / Mongoose**, y una arquitectura modular basada en capas.

---

## 🛠️ Tecnologías y Stack Utilizado
* **Node.js**
* **Express.js**
* **MongoDB & Mongoose**
* **Bcrypt** (para encriptación y validación de contraseñas)
* **Dotenv** (para gestión de variables de entorno)

---

## 📂 Estructura del Proyecto
El proyecto sigue una arquitectura modular separada por responsabilidades:

```text
src/
│
├── config/         # Configuración de base de datos y conexiones
├── controllers/    # Lógica de negocio de los endpoints (sessions.controller.js)
├── models/         # Esquemas de Mongoose (user.model.js)
├── routes/         # Enrutadores de la API (sessions.router.js)
├── utils/          # Helpers reutilizables (hash.js para bcrypt)
└── app.js          # Configuración principal de Express y middlewares

⚙️ Configuración y Variables de Entorno
Clona este repositorio en tu equipo local.

Instala las dependencias del proyecto ejecutando:

npm install

 ** Crea un archivo .env en la raíz del proyecto basándote en el archivo .env.example e incluye las siguientes variables:

PORT=3000
MONGO_URI=tu_cadena_de_conexion_de_mongodb

🚀 Cómo Ejecutar el Servidor
Modo Desarrollo (con Nodemon):

npm run dev

Modo Producción:

Bash
npm start

🔌 Endpoints de la API
### 1. Registro de Usuario
* **Ruta:** `POST /api/sessions/register`
* **Descripción:** Valida los campos obligatorios, normaliza el correo electrónico, verifica duplicados, hashea la contraseña de forma segura con `bcrypt` y guarda el usuario en la base de datos sin exponer la contraseña en la respuesta.

**Ejemplo de Payload JSON (Body):**
```json
{
  "first_name": "Rodrigo",
  "last_name": "Pérez",
  "email": "rodrigo@mail.com",
  "password": "Secreta123"
}

Descripción: Valida los campos obligatorios, normaliza el correo electrónico (minúsculas y sin espacios), verifica duplicados, hashea la contraseña de forma segura con bcrypt y guarda el usuario en la base de datos sin exponer la contraseña en la respuesta.

Body (JSON de ejemplo):

JSON
{
  "first_name": "Rodrigo",
  "last_name": "Pérez",
  "email": "rodrigo@mail.com",
  "password": "Secreta123",
  "role": "user"
}
Respuestas esperadas:

201 Created: Usuario registrado con éxito (devuelve el payload con el ID y datos generales sin contraseña).

400 Bad Request: Faltan campos obligatorios.

409 Conflict: El correo electrónico ya se encuentra registrado.

500 Internal Server Error: Error interno del servidor.

Comando de Prueba (cURL):

Bash
curl -X POST http://localhost:3000/api/sessions/register \
-H "Content-Type: application/json" \
-d '{"first_name": "Rodrigo", "last_name": "Pérez", "email": "rodrigo@mail.com", "password": "Secreta123"}'
Respuestas esperadas y casos de prueba:

201 Created: Usuario creado exitosamente (prueba enviando el JSON válido).

400 Bad Request: Faltan campos o el formato del email es inválido (prueba enviando un email sin @).

409 Conflict: El correo ya se encuentra registrado (prueba enviando el mismo comando cURL dos veces).

500 Internal Server Error: Error interno del servidor.

2. Login de Usuario
Ruta: POST /api/sessions/login

Descripción: Valida las credenciales de acceso comparando la contraseña ingresada con el hash almacenado en la base de datos mediante bcrypt.

Body (JSON de ejemplo):

JSON
{
  "email": "rodrigo@mail.com",
  "password": "Secreta123"
}
Respuestas esperadas:

200 OK: Login exitoso con mensaje de confirmación y datos de sesión.

401 Unauthorized: Usuario no encontrado o contraseña incorrecta.

500 Internal Server Error: Error interno del servidor.

🧪 Casos de Prueba Recomendados
Registro Exitoso: Enviar un usuario nuevo con todos los campos requeridos para verificar el código 201.

Validación de Contraseña Hasheada: Consultar la base de datos (MongoDB Compass/Atlas) para comprobar que el campo password se almacena cifrado y nunca en texto plano.

Control de Duplicados: Intentar registrar el mismo correo dos veces para validar la respuesta 409.

Login Seguro: Comprobar que el acceso con las credenciales correctas devuelve un código 200 y que una clave errónea rechaza el acceso con 401.

Autor: Rodrigo — Coderhouse Backend


