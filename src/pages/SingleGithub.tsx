import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserProfile, fetchUserRepos } from "../services/githubService";

/**
 * Componente que exibe o perfil de um usu rio do GitHub
 * e lista seus reposit rios p blicos.
 *
 * @param username Nome de usu rio do GitHub.
 *
 * @returns Elemento JSX que exibe o perfil do usu rio,
 *          incluindo informa es sobre seguidores, reposit rios
 *          e localiza o, e lista seus reposit rios p blicos.
 */
const SingleGithub: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (username) {
        const profileData = await fetchUserProfile(username);
        const reposData = await fetchUserRepos(username);
        setProfile(profileData);
        setRepos(reposData);
      }
    };
    fetchData();
  }, [username]);

  if (!profile) {
    return <div className="p-4">Carregando...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{profile.name}</h1>
      <p className="mb-2">Seguidores: {profile.followers}</p>
      <p className="mb-2">Seguindo: {profile.following}</p>
      <p className="mb-4">Repositórios públicos: {profile.public_repos}</p>

      <h2 className="text-xl font-bold mb-2">Repositórios</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id} className="p-2 border-b">
            {repo.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleGithub;