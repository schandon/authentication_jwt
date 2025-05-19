import express from 'express';
import {
  getProtectedData,
  getAdminData,
} from '../controllers/protected.controller';
import { protect, authorize } from '../middleware/auth.middleware';

export const protectedRoutes = express.Router();

// Protected routes
protectedRoutes.get('/protected', protect, getProtectedData);
protectedRoutes.get('/admin', protect, authorize('admin'), getAdminData);