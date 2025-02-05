// App.tsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Listagem from "./pages/Listagem";
import SingleGithub from "./pages/SingleGithub";
import Perfil from "./pages/Perfil";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";


/**
 * Protege uma rota com autentica o. Se o usu rio est  autenticado,
 * renderiza o conte do da rota. Caso contr rio, redireciona para a
 * raiz (/).
 *
 * @param children Elemento JSX que ser  renderizado se o usu rio estiver
 *                 autenticado.
 * @returns Um elemento JSX que representa a rota protegida.
 */
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

/**
 * Componente que renderiza o conte do da aplica o. Gerencia rotas
 * publicas e protegidas.
 *
 * @param searchTerm Termo de busca para a listagem.
 * @returns Um elemento JSX que representa o conte do da aplica o.
 */
const AppContent: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redireciona o usuário autenticado para /listagem se estiver na raiz
  useEffect(() => {
    if (isAuthenticated && location.pathname === "/") {
      navigate("/listagem", { replace: true });
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <Routes>
      {/* Rota Pública */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/listagem" /> : <Login />}
      />
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Rotas Protegidas */}
      <Route
        path="/listagem"
        element={
          <PrivateRoute>
            <Listagem searchTerm={searchTerm} />
          </PrivateRoute>
        }
      />
      <Route
        path="/single-github/:username"
        element={
          <PrivateRoute>
            <SingleGithub />
          </PrivateRoute>
        }
      />
      <Route
        path="/perfil/:username"
        element={
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

/**
 * Componente principal da aplicação.
 *
 * Renderiza o Router com o provedor de autentica o, o SideMenu e o
 * conte do da aplica o.
 *
 * @returns Um elemento JSX que representa o conte do da aplica o.
 */
const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        {/* Container principal: h-screen para ocupar toda a altura */}
        <div className="flex h-screen bg-gray-200">
          {/* SideMenu com animação, controle de colapso e campo de pesquisa */}
          <div className="transition-all duration-300">
            <SideMenu
              collapsed={collapsed}
              onCollapse={setCollapsed}
              onSearchChange={setSearchTerm}
            />
          </div>
          {/* Área principal: Header + Conteúdo */}
          <div className="flex flex-col flex-1 transition-all duration-300">
            <Header />
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 bg-white m-2.5 h-[calc(92vh-20px)] overflow-y-auto">
                <AppContent searchTerm={searchTerm} />
              </div>
            </div>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
