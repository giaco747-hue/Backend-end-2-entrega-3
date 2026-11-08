import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = (req, res, next) => {
  // 1. Leer el token desde la cookie 'currentUser'
  const token = req.cookies.currentUser;

  // 2. Si no hay token (no hay cookie), rechazamos con 401
  if (!token) {
    return res.status(401).json({ status: "error", message: "No autenticado" });
  }

  // 3. Verificar si el token es válido y no ha expirado
  const decoded = verifyToken(token);

  // 4. Si el token fue manipulado o expiró, devolvemos null desde verifyToken y rechazamos
  if (!decoded) {
    return res.status(401).json({ status: "error", message: "No autenticado" });
  }

  // 5. Guardar el payload decodificado en req.user para usarlo en el controlador
  req.user = decoded;
  
  // Continuar al siguiente paso (el controlador de la ruta)
  next();
};