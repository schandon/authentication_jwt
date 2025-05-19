import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { ApiError } from '../middleware/error.middleware';
import jwt, { JwtPayload } from 'jsonwebtoken';

// @desc    Register a user
// @route   POST /api/auth/register
// @access  Public
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return next(new ApiError('User already exists', 400));
    }
    
    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });
    
    // Generate tokens and send response
    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return next(new ApiError('Invalid credentials', 401));
    }
    
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return next(new ApiError('Invalid credentials', 401));
    }
    
    // Generate token and send response
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User is already available in req due to the protect middleware
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh-token
// @access  Public
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return next(new ApiError('No refresh token provided', 400));
    }
    
    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      
      // Get user by id
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return next(new ApiError('Invalid refresh token', 401));
      }
      
      // Generate new tokens
      sendTokenResponse(user, 200, res);
    } catch (error) {
      return next(new ApiError('Invalid refresh token', 401));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (
  user: any,
  statusCode: number,
  res: Response
) => {
  // Create tokens
  const token = user.getSignedJwtToken();
  const refreshToken = user.getRefreshToken();
  
  // Remove password from output
  user.password = undefined;
  
  res.status(statusCode).json({
    success: true,
    token,
    refreshToken,
    user,
  });
};