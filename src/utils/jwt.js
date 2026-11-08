import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Generar el token con el payload exacto pedido en la rúbrica
export const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };

  // Se firma con el secreto del .env y expira según la variable configurada
  return jwt.sign(payload, process.env.JWT_SECRET, { 
    expiresIn: process.env.JWT_EXPIRES_IN || '1h' 
  });
};

// Verificar el token (lo usaremos en el middleware)
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};