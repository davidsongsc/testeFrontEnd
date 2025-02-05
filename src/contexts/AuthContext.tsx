import React, { createContext, useState, useContext, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null; // Armazena o nome do usuário logado
  login: (username: string, password: string) => boolean; // Retorna true se o login for bem-sucedido
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider de autentica o do React Context.
 *
 * Respons vel por armazenar o estado de autentica o do usu rio e
 * fornecer as fun es de login e logout.
 *
 * @param children Elemento JSX que ser  renderizado.
 * @returns O elemento JSX que representa o contexto de autentica o.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  // Verifica o localStorage ao inicializar o contexto
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  }, []);

  /**
   * Realiza o login com base em credenciais do ambiente.
   *
   * @param username Nome de usu rio para logar.
   * @param password Senha para logar.
   * @returns true se o login for bem-sucedido, false caso contr rio.
   */
  const login = (username: string, password: string): boolean => {
    // Obtenha as credenciais do ambiente
    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    // Valide as credenciais
    if (username === adminUsername && password === adminPassword) {
      setIsAuthenticated(true);
      setUser(username); // Define o usuário logado
      localStorage.setItem("user", username); // Salva o usuário no localStorage
      return true; // Login bem-sucedido
    }
    return false; // Login falhou
  };

/**
 * Realiza o logout do usuário.
 *
 * Define o estado de autenticação como falso, remove o usuário atual
 * do estado e do localStorage.
 */
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user"); // Remove o usuário do localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook de autenticação que fornece o contexto de autenticação atual.
 *
 * @throws {Error} Se for usado fora de um AuthProvider.
 * @returns O contexto de autenticação, contendo informações de login e logout.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};