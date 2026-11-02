import { UsersRepository } from '../repositories/users.repository.js';
import { createHash } from '../utils/hash.js';

const usersRepository = new UsersRepository();

export class SessionsService {
  async register({ first_name, last_name, email, password }) {
  
    const normalizedEmail = email.trim().toLowerCase();

    
    const existingUser = await usersRepository.getUserByEmail(normalizedEmail);
    if (existingUser) {
      const error = new Error('El email ya está registrado');
      error.statusCode = 409; // Conflict
      throw error;
    }

    
    const hashedPassword = createHash(password);

    
    const newUser = await usersRepository.createUser({
      first_name,
      last_name,
      email: normalizedEmail,
      password: hashedPassword,
      role: 'user' 
    });

    
    const userObject = newUser.toObject ? newUser.toObject() : newUser;
    const { password: _, __v, ...userWithoutPassword } = userObject;

    
    return {
      id: userWithoutPassword._id,
      first_name: userWithoutPassword.first_name,
      last_name: userWithoutPassword.last_name,
      email: userWithoutPassword.email,
      role: userWithoutPassword.role
    };
  }
}