import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User, getUserFromToken, isAuthenticated } from '../services/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const initializeAuth = async () => {
      // Check token validity
      if (isAuthenticated()) {
        // Get user from token
        const userData = getUserFromToken();
        setUser(userData);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const contextValue = {
    user,
    isLoading,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};