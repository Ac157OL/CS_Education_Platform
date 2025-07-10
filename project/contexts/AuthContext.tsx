
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants'; // Mock user data and passwords

// Helper for localStorage
const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem('currentUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

const storeUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, passwordAttempt: string) => Promise<void>;
  register: (username: string, passwordAttempt: string, role?: 'user' | 'admin') => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Mock password store (in a real app, this would be hashed and stored securely on a backend)
const MOCK_PASSWORDS: { [username: string]: string } = {
  "admin": "adminpass",
  "testuser": "userpass",
};
let mockUsersList = [...MOCK_USERS]; // Make a mutable copy


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(getStoredUser());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This effect ensures that if localStorage is cleared or changed externally,
    // the state reflects it. (Primarily for dev/demo purposes)
    const handleStorageChange = () => {
      setCurrentUser(getStoredUser());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async (username: string, passwordAttempt: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    return new Promise((resolve, reject) => {
      setTimeout(() => { // Simulate API delay
        const user = mockUsersList.find(u => u.username === username);
        if (user && MOCK_PASSWORDS[username] === passwordAttempt) {
          setCurrentUser(user);
          storeUser(user);
          setIsLoading(false);
          resolve();
        } else {
          setError("无效的用户名或密码。");
          setIsLoading(false);
          reject(new Error("Invalid credentials"));
        }
      }, 500);
    });
  };

  const register = async (username: string, passwordAttempt: string, role: 'user' | 'admin' = 'user'): Promise<void> => {
    setIsLoading(true);
    setError(null);
    return new Promise((resolve, reject) => {
      setTimeout(() => { // Simulate API delay
        if (mockUsersList.some(u => u.username === username)) {
          setError("用户名已存在。");
          setIsLoading(false);
          reject(new Error("Username already exists"));
          return;
        }
        const newUser: User = {
          id: `user${Date.now()}`, // Simple unique ID
          username,
          role,
        };
        mockUsersList.push(newUser);
        MOCK_PASSWORDS[username] = passwordAttempt; // Store mock password
        
        // For simplicity, automatically log in after registration
        setCurrentUser(newUser); 
        storeUser(newUser);
        setIsLoading(false);
        resolve();
      }, 500);
    });
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    return new Promise((resolve) => {
      setTimeout(() => { // Simulate API delay
        setCurrentUser(null);
        storeUser(null);
        setIsLoading(false);
        resolve();
      }, 200);
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
