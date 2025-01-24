import React, { createContext, useState, useEffect } from 'react';

const TOKEN_KEY = 'auth_token';

interface LoginProviderProps {
  children: React.ReactNode;
}

interface LoginContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (newToken: string) => void;
  logout: () => void;
}
const LoginContext = createContext<LoginContextType>({
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function LoginProvider({ children }: LoginProviderProps) {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || null);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem(TOKEN_KEY, newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  return (
    <LoginContext.Provider
      value={{
        token,
        isAuthenticated: !!token,  
        login,
        logout
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export const LoginConsumer = LoginContext.Consumer;

export default LoginContext;
