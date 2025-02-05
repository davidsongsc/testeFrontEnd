import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";

/**
 * Busca os repositórios de um usuário do GitHub.
 * @param username Nome de usuário do GitHub.
 * @returns Uma lista de repositórios do usuário.
 * @throws {Error} Caso a busca falhe, dispara um erro com
 *                 uma mensagem de erro.
 */
export const fetchUserRepos = async (username: string) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar repositórios:", error);
    throw error;
  }
};


/**
 * Busca o perfil de um usuário do GitHub.
 * @param username Nome de usuário do GitHub.
 * @returns O perfil do usuário.
 * @throws {Error} Caso a busca falhe, dispara um erro com
 *                 uma mensagem de erro.
 */
export const fetchUserProfile = async (username: string) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    throw error;
  }
};