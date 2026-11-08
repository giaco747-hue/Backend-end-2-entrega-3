import { userModel } from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils/hash.js'; // <-- Ruta ajustada a carpeta
import { generateToken } from '../utils/jwt.js';

//  REGISTRO CON BCRYPT
export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ status: "error", message: "Faltan campos obligatorios" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ status: "error", message: "Formato de email inválido" });
    const emailNormalizado = email.trim().toLowerCase();

   const existeUsuario = await userModel.findOne({ email: emailNormalizado });
    if (existeUsuario) {
      return res.status(409).json({ status: "error", message: "El email ya está registrado" });
    }

   
    const newUser = await userModel.create({
      first_name,
      last_name,
     email: emailNormalizado,
      password: createHash(password),
      role: 'user'
    });

    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      status: "success",
      message: "Usuario registrado exitosamente",
      user: userResponse
    });
  } catch (error) {
    console.error("Error en registro:", error);
    return res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
};




//  LOGIN DE USUARIO
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: "error", message: "Faltan credenciales" });
    }

    // Buscamos al usuario normalizando el email
    const user = await userModel.findOne({ email: email.trim().toLowerCase() });

    // Si no existe o la contraseña no coincide, damos un error genérico por seguridad
    if (!user || !isValidPassword(password, user.password)) {
      return res.status(401).json({ status: "error", message: "Credenciales inválidas" });
    }

    // Generamos el JWT usando nuestra utilidad
    const token = generateToken(user);

    // Guardamos el token en una cookie llamada 'currentUser'
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('currentUser', token, {
      httpOnly: true, // No accesible desde el frontend (document.cookie)
      sameSite: 'lax',
      secure: isProduction, // True solo si estamos en producción
      maxAge: 3600000 // Expira en 1 hora (en milisegundos)
    });

    return res.status(200).json({ status: "success", message: "Login correcto" });

  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
};

//  RUTA PROTEGIDA (CURRENT)
export const currentUser = (req, res) => {
  // Gracias a nuestro authMiddleware, la info del usuario ya viene limpia en req.user
  return res.status(200).json({
    status: "success",
    payload: req.user
  });
};

//  LOGOUT
export const logoutUser = (req, res) => {
  // Eliminamos la cookie para cerrar sesión
  res.clearCookie('currentUser');
  return res.status(200).json({
    status: "success",
    message: "Sesión cerrada"
  });
};