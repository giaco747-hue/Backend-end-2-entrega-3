import { userModel } from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils/hash.js'; // <-- Ruta ajustada a tu carpeta

// 1. REGISTRO CON BCRYPT
export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ status: "error", message: "Faltan campos obligatorios" });
    }

    const existeUsuario = await userModel.findOne({ email });
    if (existeUsuario) {
      return res.status(409).json({ status: "error", message: "El email ya está registrado" });
    }

    // Crear el usuario con la contraseña encriptada
    const newUser = await userModel.create({
      first_name,
      last_name,
      email,
      password: createHash(password), // <-- Usando tu utilidad de hash
      role
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


// 2. LOGIN CON BCRYPT
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: "error", message: "Faltan credenciales" });
    }

    const user = await userModel.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ status: "error", message: "Usuario no encontrado" });
    }

    // Comparar la clave ingresada vs el hash de la BD
    if (!isValidPassword(password, user.password)) {
      return res.status(401).json({ status: "error", message: "Contraseña incorrecta" });
    }

    return res.status(200).json({ 
      status: "success", 
      message: "¡Login exitoso!",
      payload: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
};