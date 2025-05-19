import { Request, Response, NextFunction } from 'express';

// @desc    Get protected data
// @route   GET /api/protected
// @access  Private
export const getProtectedData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    success: true,
    message: 'You have access to this protected data',
    user: req.user,
    data: {
      id: 1,
      title: 'Protected resource example',
      description: 'This data is only accessible to authenticated users',
    },
  });
};

// @desc    Get admin only data
// @route   GET /api/admin
// @access  Private/Admin
export const getAdminData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    success: true,
    message: 'You have access to admin data',
    user: req.user,
    data: {
      id: 1,
      title: 'Admin resource example',
      description: 'This data is only accessible to admin users',
      sensitiveData: 'This is sensitive admin-only information',
    },
  });
};