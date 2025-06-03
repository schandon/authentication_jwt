/**
 * Token storage utility functions
 */

// Key used for storing the JWT token
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Get the stored JWT token
 * @returns The stored token or null if not found
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Store a JWT token
 * @param token The token to store
 */
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Store a refresh token
 * @param token The refresh token to store
 */
export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

/**
 * Get the stored refresh token
 * @returns The stored refresh token or null if not found
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Remove the stored JWT token and refresh token
 */
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Check if there is a valid token
 * @returns True if the token exists
 */
export const hasToken = (): boolean => {
  return !!getToken();
};