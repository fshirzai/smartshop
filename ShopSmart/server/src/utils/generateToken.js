import jwt from 'jsonwebtoken';

export const generateToken = (payload, expires = '30d') =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expires });
