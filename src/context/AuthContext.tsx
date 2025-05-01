import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  isAgency: boolean;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('popx_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // This would normally be an API call
      // Simulating an API response for demo purposes
      const mockUser: User = {
        id: '1',
        fullName: 'Marry Doe',
        email: email,
        phone: '+1234567890',
        company: 'PopX Agency',
        isAgency: true,
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      };
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUser(mockUser);
      localStorage.setItem('popx_user', JSON.stringify(mockUser));
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    setLoading(true);
    try {
      // This would normally be an API call
      // Simulating an API response for demo purposes
      const { password, ...userWithoutPassword } = userData;
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        ...userWithoutPassword,
      };
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUser(mockUser);
      localStorage.setItem('popx_user', JSON.stringify(mockUser));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('popx_user');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};