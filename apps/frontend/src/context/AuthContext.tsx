import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@uni-news/types';
import { LaunchScreen } from '@/components/LaunchScreen';
import { useGetMe } from '@/services/queries/user';
import { localStorageKeys } from '@/config/localStorageKeys';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(localStorageKeys.USER);
    if (!storedUser || storedUser === "undefined") return null;
    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem(localStorageKeys.USER);
      return null;
    }
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem(localStorageKeys.AUTHTOKEN);
    return !!token;
  });

  const { isError, isLoading } = useGetMe();

  const login = (token: string, newUser: User) => {
    localStorage.setItem(localStorageKeys.AUTHTOKEN, token);
    localStorage.setItem(localStorageKeys.USER, JSON.stringify(newUser));
    setIsAuthenticated(true);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem(localStorageKeys.AUTHTOKEN);
    localStorage.removeItem(localStorageKeys.USER);    
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (isError) {
      logout();
    }
  }, [isError, logout]);

  const showLaunchScreen = isAuthenticated && isLoading;

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: isAuthenticated, 
        user,  
        login, 
        logout 
      }}
    >
      <LaunchScreen isLoading={isLoading} />      
      {!showLaunchScreen && children}
    </AuthContext.Provider>
  )
}