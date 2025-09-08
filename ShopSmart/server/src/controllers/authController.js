import User from '../models/User.js';
import { registerSchema, loginSchema, updateProfileSchema } from '../validation/userValidation.js';

/* ---------- helpers ---------- */
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwt();
  res.status(statusCode).json({ success: true, token, data: user });
};

/* ---------- public ---------- */
export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  sendToken(user, 201, res);
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  sendToken(user, 200, res);
};

/* ---------- protected ---------- */
export const getProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
};

export const updateProfile = async (req, res, next) => {
  const { name, password } = req.body;
  const fields = {};
  if (name) fields.name = name;
  if (password) fields.password = password;
  const user = await User.findByIdAndUpdate(req.user.id, fields, { new: true, runValidators: true });
  res.status(200).json({ success: true, data: user });
};
