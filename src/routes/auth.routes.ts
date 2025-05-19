import express from 'express';
import {
  register,
  login,
  getMe,
  refreshToken,
  logout,
} from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

export const authRoutes = express.Router();

// Public routes
authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/refresh-token', refreshToken);

// Protected routes
authRoutes.get('/me', protect, getMe);
authRoutes.get('/logout', protect, logout);