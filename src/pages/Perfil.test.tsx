import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Perfil from "./Perfil";

// Mock do módulo axios
jest.mock("axios");

describe("Componente Perfil", () => {
  const mockUsername = "testuser";

  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it("deve exibir o estado de carregamento inicialmente", () => {
    render(
      <MemoryRouter initialEntries={[`/perfil/${mockUsername}`]}>
        <Perfil />
      </MemoryRouter>
    );

    // Verifica se a mensagem de carregamento está presente
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("deve exibir uma mensagem de erro ao falhar na busca dos dados do GitHub", async () => {
    // Simula uma falha na requisição
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Erro na API"));

    render(
      <MemoryRouter initialEntries={[`/perfil/${mockUsername}`]}>
        <Perfil />
      </MemoryRouter>
    );

    // Aguarda a conclusão do estado de carregamento
    await waitFor(() => {
      expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
    });

    // Verifica se a mensagem de erro é exibida
    expect(screen.getByText("Erro ao buscar dados do GitHub.")).toBeInTheDocument();
  });

  it("deve exibir os dados do usuário ao buscar com sucesso", async () => {
    // Dados simulados da API do GitHub
    const mockUserData = {
      login: "testuser",
      avatar_url: "https://example.com/avatar.png",
      name: "Test User",
      bio: "Desenvolvedor Frontend",
      followers: 100,
      following: 50,
      public_repos: 20,
      location: "São Paulo, Brasil",
      html_url: "https://github.com/testuser",
    };

    // Simula uma resposta bem-sucedida
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUserData });

    render(
      <MemoryRouter initialEntries={[`/perfil/${mockUsername}`]}>
        <Perfil />
      </MemoryRouter>
    );

    // Aguarda a conclusão do estado de carregamento
    await waitFor(() => {
      expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
    });

    // Verifica se os dados do usuário são exibidos
    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("Desenvolvedor Frontend")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument(); // Seguidores
    expect(screen.getByText("50")).toBeInTheDocument(); // Seguindo
    expect(screen.getByText("20")).toBeInTheDocument(); // Repositórios
    expect(screen.getByText("São Paulo, Brasil")).toBeInTheDocument(); // Localização

    // Verifica o link para o perfil no GitHub
    const githubLink = screen.getByRole("link", { name: "Ver perfil no GitHub" });
    expect(githubLink).toHaveAttribute("href", "https://github.com/testuser");
  });

  it("deve exibir uma mensagem caso o README não seja encontrado", async () => {
    // Dados simulados da API do GitHub
    const mockUserData = {
      login: "testuser",
      avatar_url: "https://example.com/avatar.png",
      name: "Test User",
      bio: "Desenvolvedor Frontend",
      followers: 100,
      following: 50,
      public_repos: 20,
      location: "São Paulo, Brasil",
      html_url: "https://github.com/testuser",
    };

    // Simula uma resposta bem-sucedida para os dados do usuário
    (axios.get as jest.Mock)
      .mockResolvedValueOnce({ data: mockUserData }) // Primeira chamada: dados do usuário
      .mockRejectedValueOnce(new Error("README não encontrado")); // Segunda chamada: erro no README

    render(
      <MemoryRouter initialEntries={[`/perfil/${mockUsername}`]}>
        <Perfil />
      </MemoryRouter>
    );

    // Aguarda a conclusão do estado de carregamento
    await waitFor(() => {
      expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
    });

    // Verifica se a mensagem de README não encontrado é exibida
    expect(screen.getByText("README não encontrado.")).toBeInTheDocument();
  });

  it("deve exibir o conteúdo do README ao buscar com sucesso", async () => {
    // Dados simulados da API do GitHub
    const mockUserData = {
      login: "testuser",
      avatar_url: "https://example.com/avatar.png",
      name: "Test User",
      bio: "Desenvolvedor Frontend",
      followers: 100,
      following: 50,
      public_repos: 20,
      location: "São Paulo, Brasil",
      html_url: "https://github.com/testuser",
    };

    const mockReadmeContent = "# Olá, mundo!\nEste é o meu README.";

    // Simula respostas bem-sucedidas
    (axios.get as jest.Mock)
      .mockResolvedValueOnce({ data: mockUserData }) // Primeira chamada: dados do usuário
      .mockResolvedValueOnce({ data: mockReadmeContent }); // Segunda chamada: conteúdo do README

    render(
      <MemoryRouter initialEntries={[`/perfil/${mockUsername}`]}>
        <Perfil />
      </MemoryRouter>
    );

    // Aguarda a conclusão do estado de carregamento
    await waitFor(() => {
      expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
    });

    // Verifica se o conteúdo do README é exibido
    expect(screen.getByText("Olá, mundo!")).toBeInTheDocument();
    expect(screen.getByText("Este é o meu README.")).toBeInTheDocument();
  });
});