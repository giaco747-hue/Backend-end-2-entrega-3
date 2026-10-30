import { UsersRepository } from '../repositories/users.repository.js';
import { createHash } from '../utils/hash.js';

const usersRepository = new UsersRepository();

export class SessionsService {
  async register({ first_name, last_name, email, password }) {
    // 1. Normalización de email (trim + lowercase)
    const normalizedEmail = email.trim().toLowerCase();

    // 2. Verificar duplicado
    const existingUser = await usersRepository.getUserByEmail(normalizedEmail);
    if (existingUser) {
      const error = new Error('El email ya está registrado');
      error.statusCode = 409; // Conflict
      throw error;
    }

    // 3. Hashear la contraseña
    const hashedPassword = createHash(password);

    // 4. Crear objeto de usuario garantizando que role sea "user"
    const newUser = await usersRepository.createUser({
      first_name,
      last_name,
      email: normalizedEmail,
      password: hashedPassword,
      role: 'user' // Ignora cualquier rol manipulado desde el body
    });

    // 5. Retornar el usuario limpio SIN la contraseña
    const userObject = newUser.toObject ? newUser.toObject() : newUser;
    const { password: _, __v, ...userWithoutPassword } = userObject;

    // Formatear la propiedad _id como id para la respuesta estandarizada
    return {
      id: userWithoutPassword._id,
      first_name: userWithoutPassword.first_name,
      last_name: userWithoutPassword.last_name,
      email: userWithoutPassword.email,
      role: userWithoutPassword.role
    };
  }
}