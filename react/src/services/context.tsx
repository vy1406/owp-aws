import React, { createContext, useState, useEffect } from 'react';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const N_A = 'N/A';
interface LoginProviderProps {
  children: React.ReactNode;
}
interface LoginParams {
  token: string;
  username: string;
}
interface LoginContextType {
  token: string | null;
  isAuthenticated: boolean;
  username: string;
  login: (login: LoginParams) => void;
  logout: () => void;
}

const LoginContext = createContext<LoginContextType>({
  token: null,
  isAuthenticated: false,
  username: N_A,
  login: () => {},
  logout: () => {},
});

export function LoginProvider({ children }: LoginProviderProps) {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || null);
  const [username, setUsername] = useState(N_A);

  const login = (props: LoginParams) => {
    setToken(props.token);
    setUsername(props.username || N_A)
    localStorage.setItem(TOKEN_KEY, props.token);
    localStorage.setItem(TOKEN_KEY, props.username);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, username);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }, [token, username]);

  return (
    <LoginContext.Provider
      value={{
        token,
        username,
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
