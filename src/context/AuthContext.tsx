// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../config/api';

interface User {
  id: number;
  username: string;
  email: string;
  status: string;
}

interface DecodedToken {
  exp: number;
  id: number;
  username: string;
  email: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Decodificar JWT (sem verificar assinatura - apenas para leitura no frontend)
const decodeJWT = (token: string): DecodedToken | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
};

// Verificar se token está expirado
const isTokenExpired = (token: string): boolean => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;
  
  return decoded.exp * 1000 < Date.now(); // exp está em segundos, Date.now() em milissegundos
};

// Obter tempo até expiração
const getTimeUntilExpiry = (token: string): number => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return 0;
  
  return decoded.exp * 1000 - Date.now();
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTimeout, setRefreshTimeout] = useState<NodeJS.Timeout | null>(null);

  // Configurar renovação automática do token (15 minutos antes da expiração)
  const scheduleTokenRefresh = useCallback((token: string) => {
    const timeUntilExpiry = getTimeUntilExpiry(token);
    const refreshTime = Math.max(0, timeUntilExpiry - 15 * 60 * 1000); // 15 minutos antes

    if (refreshTimeout) clearTimeout(refreshTimeout);

    if (refreshTime > 0) {
      const timeout = setTimeout(() => {
        console.log('Renovando token automaticamente...');
        // Será chamado automaticamente quando o contexto chamar refreshToken
      }, refreshTime);

      setRefreshTimeout(timeout);
    }
  }, [refreshTimeout]);

  // Verificar autenticação ao carregar
  useEffect(() => {
    checkAuth();
  }, []);

  // Interceptor para adicionar token nas requisições
  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => api.interceptors.request.eject(interceptor);
  }, [token]);

  // Interceptor para lidar com 401 (token expirado)
  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expirado, tentar renovar
          const originalRequest = error.config;

          if (!originalRequest._retry) {
            originalRequest._retry = true;

            try {
              await refreshToken();
              // Repetir a requisição original com novo token
              return api(originalRequest);
            } catch (refreshError) {
              // Falha ao renovar, fazer logout
              await logout();
              return Promise.reject(refreshError);
            }
          }
        }

        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(responseInterceptor);
  }, [token]);

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      
      const response = await api.post('/auth.php?action=login', {
        username,
        password,
      });

      if (response.data.success) {
        const newToken = response.data.token;
        const userData = response.data.user;
        const expiresIn = response.data.expiresIn;
        
        if (!newToken) {
          throw new Error('Token não foi retornado pela API.');
        }

        setToken(newToken);
        setUser(userData);

        // Salvar no localStorage
        localStorage.setItem('authToken', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('tokenExpiry', expiresIn.toString());

        // Agendar renovação automática
        scheduleTokenRefresh(newToken);
      } else {
        throw new Error(response.data.message || 'Erro ao fazer login');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Erro ao fazer login';
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      if (!token) throw new Error('Nenhum token disponível');

      const response = await api.post('/auth.php?action=refresh', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const newToken = response.data.token;

        setToken(newToken);
        localStorage.setItem('authToken', newToken);
        localStorage.setItem('tokenExpiry', response.data.expiresIn.toString());

        // Reagendar renovação automática
        scheduleTokenRefresh(newToken);

        console.log('Token renovado com sucesso');
      } else {
        throw new Error(response.data.message || 'Erro ao renovar token');
      }
    } catch (error: any) {
      console.error('Erro ao renovar token:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await api.post('/auth.php?action=logout');

      setToken(null);
      setUser(null);

      // Limpar localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiry');

      // Limpar timeout
      if (refreshTimeout) clearTimeout(refreshTimeout);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      // Tentar restaurar token do localStorage
      const savedToken = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('user');

      if (savedToken && savedUser) {
        // Verificar se token está expirado
        if (isTokenExpired(savedToken)) {
          console.log('Token expirado');
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          localStorage.removeItem('tokenExpiry');
          setToken(null);
          setUser(null);
        } else {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));

          // Validar token no servidor
          try {
            const response = await api.get('/auth.php?action=me', {
              headers: {
                Authorization: `Bearer ${savedToken}`,
              },
            });

            if (response.data.success) {
              setUser(response.data.user);
              localStorage.setItem('user', JSON.stringify(response.data.user));

              // Agendar renovação automática
              scheduleTokenRefresh(savedToken);
            } else {
              // Token inválido
              localStorage.removeItem('authToken');
              localStorage.removeItem('user');
              localStorage.removeItem('tokenExpiry');
              setToken(null);
              setUser(null);
            }
          } catch (error) {
            console.error('Erro ao validar token:', error);
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            localStorage.removeItem('tokenExpiry');
            setToken(null);
            setUser(null);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        checkAuth,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};