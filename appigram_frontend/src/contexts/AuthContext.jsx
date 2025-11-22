import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('access') || null);
  const [user, setUser] = useState(token ? jwt_decode(token) : null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('access', token);
      setUser(jwt_decode(token));
    } else {
      localStorage.removeItem('access');
      setUser(null);
    }
  }, [token]);

const login = async (email, password) => {
  const res = await api.post('auth/token/', {username: email, password });
  const { access, refresh } = res.data;
  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);
  setToken(access);
};

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    location.reload();
  };

  const register = async (firstName, lastName, email, password) => {
    return api.post('auth/register/', {
      first_name: firstName,
      last_name: lastName,
      email,
      password
    });
  };

  const authHeaders = () => ({ Authorization: `Bearer ${token}` });

  return (
    <AuthContext.Provider value={{ token, user, login, logout, register, authHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};
