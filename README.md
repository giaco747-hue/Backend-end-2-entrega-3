# Proyecto Backend - Coderhouse (Pre-entrega 3)

Backend desarrollado con Node.js, Express y MongoDB, implementando un sistema de autenticación seguro de usuarios mediante JWT (JSON Web Tokens) almacenados en cookies `httpOnly`[cite: 5].

## Tecnologías Utilizadas
* **Node.js** & **Express**
* **MongoDB** & **Mongoose** (Base de datos y modelado)
* **Bcrypt** (Hasheo seguro de contraseñas)[cite: 5]
* **JSON Web Token (JWT)** & **Cookie-Parser** (Autenticación y manejo de sesión)[cite: 5]

## Configuración y Arranque

1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Crear un archivo `.env` en la raíz del proyecto basándose en las variables de `.env.example`[cite: 4, 5].
4. Ejecutar el servidor en modo desarrollo con `npm run dev`.

---

## Documentación de la API (Endpoints)[cite: 4]

### 1. Registro de Usuario
* **Ruta:** `POST /api/sessions/register`
* **Descripción:** Valida campos obligatorios, normaliza el email, rechaza duplicados, hashea la contraseña con `bcrypt` y guarda el usuario sin devolver información sensible.

**Ejemplo de Request (Body JSON):**
```json
{
  "first_name": "Rodrigo",
  "last_name": "Pérez",
  "email": "rodrigo@mail.com",
  "password": "Secreta123"
}
Respuestas:201 Created: Usuario registrado exitosamente.400 Bad Request: Faltan campos o el email tiene formato inválido.409 Conflict: El email ya está registrado.2. Login de UsuarioRuta: POST /api/sessions/loginDescripción: Busca al usuario por email y compara la contraseña. Si coinciden, genera un JWT con el payload { id, email, role } y lo almacena en una cookie currentUser configurada como httpOnly.   Ejemplo de Request (Body JSON):JSON{
  "email": "rodrigo@mail.com",
  "password": "Secreta123"
}
Respuestas:200 OK: Login exitoso (Configura la cookie currentUser en el navegador/cliente).   400 Bad Request: Faltan credenciales (email o contraseña).   401 Unauthorized: Credenciales inválidas (mensaje genérico por seguridad).   3. Obtener Usuario Actual (Current)Ruta: GET /api/sessions/currentDescripción: Ruta protegida mediante middleware. Lee la cookie currentUser, verifica y valida el JWT y devuelve el payload del usuario autenticado (sin el password).   Respuestas:200 OK: Devuelve el payload del usuario autenticado.   JSON{
  "status": "success",
  "payload": {
    "id": "6aefc21bf054...",
    "email": "rodrigo@mail.com",
    "role": "user",
    "iat": 1794097769,
    "exp": 1794101369
  }
}
401 Unauthorized: No autenticado (falta la cookie, token inválido o expirado).   4. Logout de UsuarioRuta: POST /api/sessions/logoutDescripción: Elimina la cookie currentUser del cliente para cerrar la sesión activa[cite: 1, 5].Respuestas:200 OK: Sesión cerrada exitosamente (borra la cookie).   
Guarda el archivo y ejecuta tu último push para dejar el repositorio listo para la entrega:

```bash
git add README.md
git commit -m "docs: actualizar readme con documentacion completa de rutas auth jwt y cookies"
git push origin main

                **** CREADO POR RODRIGO NAVAS GIACOMETTO PARA CODERHOUSE ****