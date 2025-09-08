import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('auth-token');
    if (token) {
      // In a real app, you'd validate the token with your backend
      const mockUser = {
        id: '1',
        email: 'admin@civic.gov',
        name: 'Admin User',
        role: 'administrator'
      };
      setUser(mockUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Mock API call - replace with real authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@civic.gov' && password === 'admin123') {
      const mockUser = {
        id: '1',
        email,
        name: 'Admin User',
        role: 'administrator'
      };
      
      localStorage.setItem('auth-token', 'mock-jwt-token');
      setUser(mockUser);
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};