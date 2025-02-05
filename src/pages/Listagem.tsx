// Listagem.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ListagemProps {
    searchTerm: string;
}

/**
 * Componente que exibe uma lista de repositórios e usuários
 * do GitHub com base em um termo de busca.
 *
 * @param searchTerm Termo de busca utilizado para filtrar os
 *                   resultados da listagem.
 *
 * @returns Elemento JSX que exibe os resultados da busca, incluindo
 *          repositórios e usuários, e trata estados de carregamento
 *          e erro.
 *
 * @description O componente utiliza o hook `useEffect` para realizar
 *              buscas na API do GitHub sempre que o `searchTerm` for
 *              alterado. Os resultados são exibidos em listas 
 *              separadas para repositórios e usuários. Além disso,
 *              gerencia estados de carregamento, erro e navegação
 *              para páginas de perfil.
 */
const Listagem: React.FC<ListagemProps> = ({ searchTerm }) => {
    const [repositories, setRepositories] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastFetchTime, setLastFetchTime] = useState(0);
    const navigate = useNavigate();


    /**
     * Realiza uma busca na API do GitHub com base em um termo de
     * busca e atualiza os estados `repositories` e `users` com os
     * resultados. Trata estados de carregamento e erro.
     *
     * @param query Termo de busca utilizado para filtrar os
     *              resultados da listagem.
     * @throws {Error} Caso a busca falhe, dispara um erro com
     *                 uma mensagem de erro.
     */
    const fetchData = async (query: string) => {

        const currentTime = Date.now();
        if (currentTime - lastFetchTime < 5000) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setLastFetchTime(currentTime);

            // Busca repositórios
            const reposResponse = await axios.get(
                `https://api.github.com/search/repositories?q=${query}`
            );
            setRepositories(reposResponse.data.items);

            // Busca usuários
            const usersResponse = await axios.get(
                `https://api.github.com/search/users?q=${query}`
            );
            setUsers(usersResponse.data.items);
        } catch (err: any) {
            setError("Erro ao buscar dados do GitHub.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Sempre que o searchTerm mudar, dispara a busca (se houver algo digitado)
    useEffect(() => {
        if (searchTerm.trim()) {
            fetchData(searchTerm);
        } else {
            setRepositories([]);
            setUsers([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    
    /**
     * Navega para a p gina de perfil de um usu rio
     *
     * @param username Nome de usu rio a ser navegado
     */
    const goToProfile = (username: string) => {
        navigate(`/perfil/${username}`);
    };

    return (
        <div className="p-10 bg-white m-2.5 h-[calc(92vh-20px)] overflow-y-auto">
            {/* Header para exibir que se trata de resultados */}
            <h1 className="text-2xl font-bold mb-4">Resultados da Pesquisa</h1>

            {/* Mensagem de Carregamento */}
            {loading && <p>Carregando...</p>}

            {/* Mensagem de Erro */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Exibe as listas se houver resultados */}
            {(repositories.length > 0 || users.length > 0) && (
                <div className="flex space-x-4 mt-4">
                    {/* Coluna 1: Repositórios */}
                    {repositories.length > 0 && (
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-2">
                                Repositórios Encontrados
                            </h2>
                            <ul>
                                {repositories.map((repo) => (
                                    <li
                                        key={repo.id}
                                        className="p-2 border-b cursor-pointer hover:bg-gray-100"
                                    >
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500"
                                        >
                                            {repo.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Coluna 2: Usuários */}
                    {users.length > 0 && (
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-2">
                                Usuários Encontrados
                            </h2>
                            <ul>
                                {users.map((user) => (
                                    <li
                                        key={user.id}
                                        className="p-2 border-b cursor-pointer hover:bg-gray-100"
                                        onClick={() => goToProfile(user.login)}
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={user.avatar_url}
                                                alt={`Avatar de ${user.login}`}
                                                className="w-8 h-8 rounded-full mr-2"
                                            />
                                            <span>{user.login}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Mensagem se não houver resultado */}
            {(!repositories.length && !users.length && !loading && !error) && (
                <p>Nenhum resultado encontrado.</p>
            )}
        </div>
    );
};

export default Listagem;
