import bcrypt from 'bcrypt';


export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Compara una contraseña ingresada con el hash guardado en la BD (útil para el futuro login)
export const isValidPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};