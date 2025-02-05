import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Componente de login da aplicação.
 *
 * Renderiza um formulário de login com campos de usuário e senha.
 * Chama o hook de autenticação `login` com as credenciais fornecidas
 * e redireciona para `/listagem` se o login for bem-sucedido.
 * Caso contrário, exibe uma mensagem de erro.
 *
 * @returns Um elemento JSX que representa o formulário de login.
 */
const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    /**
     * Função chamada quando o formulário de login é submetido.
     *
     * Chama o hook de autenticação `login` com as credenciais
     * fornecidas pelo usuário e redireciona para `/listagem` se
     * o login for bem-sucedido. Caso contrário, exibe uma mensagem
     * de erro.
     */
    const handleLogin = () => {
        const isAuthenticated = login(username, password);
        if (isAuthenticated) {
            navigate("/listagem");
        } else {
            alert("Credenciais inválidas. Tente novamente.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <button onClick={handleLogin} className="w-full p-2 bg-blue-500 text-white rounded">
                    Entrar
                </button>
            </div>
        </div>
    );
};

export default Login;