import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

/**
 * Componente de perfil de um usuário do GitHub.
 *
 * Recebe como parâmetro o nome de usuário (username) e busca os dados do
 * perfil na API do GitHub. Caso o usuário seja encontrado, exibe os dados
 * do perfil em uma card com informações básicas como nome, avatar, bio,
 * seguidores, seguidos, repositórios e localização.
 *
 * Além disso, busca o README do repositório do usuário e o exibe em uma
 * seção com estilo do GitHub.
 *
 * Caso o usuário não seja encontrado, exibe uma mensagem de erro.
 *
 * @param username Nome de usuário do perfil a ser exibido.
 *
 * @returns O componente de perfil do usuário.
 */
const Perfil: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = useState<any>(null);
  const [readme, setReadme] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingReadme, setLoadingReadme] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar dados do usuário
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setUserData(response.data);
        // Salva os dados do usuário no localStorage
        localStorage.setItem("lastProfile", JSON.stringify(response.data));
      } catch (err: any) {
        setError("Erro ao buscar dados do GitHub.");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  // Buscar README do repositório do usuário (ex.: username/username)
  useEffect(() => {
    const fetchReadme = async () => {
      if (!username) return;
      setLoadingReadme(true);
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${username}/${username}/readme`,
          {
            headers: {
              Accept: "application/vnd.github.v3.raw", // Retorna o conteúdo em texto puro
            },
          }
        );
        setReadme(response.data);
      } catch (err: any) {
        console.error("Erro ao buscar README:", err);
        setReadme(null);
      } finally {
        setLoadingReadme(false);
      }
    };

    fetchReadme();
  }, [username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Nenhum dado do usuário encontrado.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Card de Perfil */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={userData.avatar_url}
            alt={`Avatar de ${userData.login}`}
            className="w-32 h-32 rounded-full border-2 border-gray-200"
          />
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{userData.login}</h1>
            <p className="text-gray-600">{userData.name || "Nome não informado"}</p>
            <p className="mt-2 text-gray-500">{userData.bio || "Bio não informada"}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xl font-semibold text-gray-800">{userData.followers}</p>
            <p className="text-gray-600">Seguidores</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-800">{userData.following}</p>
            <p className="text-gray-600">Seguindo</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-800">{userData.public_repos}</p>
            <p className="text-gray-600">Repositórios</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-800">
              {userData.location || "N/A"}
            </p>
            <p className="text-gray-600">Localização</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Ver perfil no GitHub
          </a>
        </div>
      </div>

      {/* Seção do README com estilo do GitHub */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">README</h2>
        {loadingReadme ? (
          <p>Carregando README...</p>
        ) : readme ? (
          <div className="markdown-body">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeRaw]}
            >
              {readme}
            </ReactMarkdown>
          </div>
        ) : (
          <p>README não encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Perfil;
