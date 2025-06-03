import { jwtDecode } from 'jwt-decode';
import api from './api';
import { setToken, setRefreshToken, removeToken, getToken } from './tokenStorage';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  picture?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

interface DecodedToken {
  sub: string;
  email: string;
  name: string;
  role: string;
  picture?: string;
  exp: number;
}

export const loginWithGoogle = async (credential: string): Promise<User> => {
  try {
    const response = await api.post<AuthResponse>('/auth/google', { credential });
    const { token, refreshToken, user } = response.data;
    
    setToken(token);
    setRefreshToken(refreshToken);
    
    return user;
  } catch (error) {
    console.error('Google login failed:', error);
    throw error;
  }
};

export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const { token, refreshToken, user } = response.data;
    
    setToken(token);
    setRefreshToken(refreshToken);
    
    return user;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const register = async (data: RegisterData): Promise<User> => {
  try {
    const response = await api.post<AuthResponse>('/auth/register', data);
    const { token, refreshToken, user } = response.data;
    
    setToken(token);
    setRefreshToken(refreshToken);
    
    return user;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout API call failed:', error);
  } finally {
    removeToken();
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get<User>('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Invalid token:', error);
    removeToken();
    return false;
  }
};

export const getUserFromToken = (): User | null => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
      picture: decoded.picture
    };
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};