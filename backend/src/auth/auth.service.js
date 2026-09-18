import jwt from 'jsonwebtoken';

const HARDCODED_USER = {
  username: process.env.AUTH_USERNAME || 'admin',
  password: process.env.AUTH_PASSWORD || 'admin123',
};

/**
 * Servicio de autenticación (Lógica de negocio de login).
 * No depende de Express ni de base de datos directamente.
 */
export const authenticateUser = ({ username, password }) => {
  const validUsername = process.env.AUTH_USERNAME || HARDCODED_USER.username;
  const validPassword = process.env.AUTH_PASSWORD || HARDCODED_USER.password;

  if (username !== validUsername || password !== validPassword) {
    return null;
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};
