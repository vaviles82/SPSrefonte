import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error("Erreur parsing user storage", e);
        localStorage.removeItem('user');
      } finally {
        setLoading(false); // Assure que loading passe à false même en cas d'erreur
      }
    };
    initAuth();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', userData.role === 'ADMIN' ? 'true' : 'false');
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  // On retourne toujours le Provider, même si loading est true, 
  // pour éviter l'écran blanc permanent
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) return {}; // Évite le crash si utilisé hors provider
  return context;
};