import * as authService from './auth.service.js';

export const login = (req, res) => {
  const { username, password } = req.body;
  const token = authService.authenticateUser({ username, password });

  if (!token) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  return res.status(200).json({ token });
};
