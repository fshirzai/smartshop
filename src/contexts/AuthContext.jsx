import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { authAPI } from '../api/authAPI';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ---------- bootstrap user ---------- */
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) return setLoading(false);
      try {
        const { data } = await authAPI.refresh(); // GET /auth/refresh
        setUser(data);
        localStorage.setItem('token', data.token);
      } catch {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------- actions ---------- */
  const login = useCallback(async (credentials) => {
    const { data } = await authAPI.login(credentials);
    localStorage.setItem('token', data.token);
    setUser(data.user);
    navigate('/');
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const value = { user, login, logout, setUser, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
