# Projeto Dashboard Admin

Uma aplicação de exemplo para demonstrar autenticação, navegação e consumo da API do GitHub utilizando React, React Router e Ant Design.

> **Nota:**  
> Esta documentação foi gerada automaticamente pelo [documentation.js](https://documentation.js.org/).  
> Atualize a documentação modificando os comentários no código.

---

## 📚 Table of Contents

- [PrivateRoute](#privateroute)
  - [Parameters](#parameters)
- [AppContent](#appcontent)
  - [Parameters](#parameters-1)
- [App](#app)
- [Header](#header)
- [SideMenu](#sidemenu)
  - [Parameters](#parameters-2)
- [confirmSearch](#confirmsearch)
- [AuthProvider](#authprovider)
  - [Parameters](#parameters-3)
- [login](#login)
  - [Parameters](#parameters-4)
- [logout](#logout)
- [useAuth](#useauth)
- [Listagem](#listagem)
  - [Parameters](#parameters-5)
- [fetchData](#fetchdata)
  - [Parameters](#parameters-6)
- [goToProfile](#gotoprofile)
  - [Parameters](#parameters-7)
- [Login Component](#login-component)
- [handleLogin](#handlelogin)
- [Perfil](#perfil)
  - [Parameters](#parameters-8)
- [SingleGithub](#singlegithub)
  - [Parameters](#parameters-9)
- [fetchUserRepos](#fetchuserrepos)
  - [Parameters](#parameters-10)
- [fetchUserProfile](#fetchuserprofile)
  - [Parameters](#parameters-11)

---

## 🔒 PrivateRoute

Protege uma rota, renderizando seu conteúdo somente se o usuário estiver autenticado. Caso contrário, redireciona para a raiz (`/`).

**Type:** `React.FC<{ children: React.ReactNode }>`  

### Parameters

- **children:** JSX Element que será renderizado se o usuário estiver autenticado.

_Returns a JSX element representing the protected route._

---

## 📦 AppContent

Componente que renderiza o conteúdo da aplicação, gerenciando rotas públicas e protegidas.

**Type:** `React.FC<{ searchTerm: string }>`  

### Parameters

- **searchTerm:** Termo de busca para a listagem.

_Returns a JSX element representing the main content area._

---

## 🚀 App

Componente principal da aplicação.  
Configura o Router com o AuthProvider, SideMenu e a área de conteúdo.

**Type:** `React.FC`

_Returns a JSX element representing the entire application._

---

## 📰 Header

Componente de cabeçalho da aplicação.  
Renderiza um header com fundo branco, texto preto e um ícone de menu na lateral esquerda.

**Type:** `React.FC`

_Returns a JSX element representing the header._

---

## 📑 SideMenu

Componente de menu lateral que oferece navegação e funcionalidades de pesquisa.  
Exibe diferentes opções de menu com base no estado de autenticação do usuário e ajusta seu layout conforme o estado de colapso.

**Type:** `React.FC<SideMenuProps>`

### Parameters

- **collapsed:** Indica se o menu lateral está colapsado.
- **onCollapse:** Função chamada quando o menu é colapsado ou expandido.
- **onSearchChange:** Função chamada para atualizar o termo de busca quando a pesquisa é confirmada.

_Returns a JSX element representing the side menu with navigation options and a search field._

---

## 🔍 confirmSearch

Confirma a pesquisa e chama a função `onSearchChange` com o valor atual do `localSearchTerm`.

---

## 🔐 AuthProvider

Provider do React Context responsável por armazenar o estado de autenticação do usuário e fornecer as funções de login e logout.

**Type:** `React.FC<{ children: React.ReactNode }>`  

### Parameters

- **children:** JSX Element a ser renderizado dentro do contexto de autenticação.

_Returns the JSX element representing the authentication context._

---

## 👤 login

Realiza o login com base nas credenciais fornecidas.

### Parameters

- **username:** `string` – Nome de usuário.
- **password:** `string` – Senha.

_Returns `boolean`: `true` se o login for bem-sucedido, `false` caso contrário._

---

## 🚪 logout

Realiza o logout do usuário.  
Define o estado de autenticação como falso e remove o usuário do estado e do localStorage.

---

## 🔑 useAuth

Hook que fornece o contexto de autenticação atual.

_Throws an Error if used outside of an AuthProvider._

_Returns the authentication context, including login and logout functions._

---

## 🔎 Listagem

Componente que exibe os resultados da busca na API do GitHub.  
Utiliza `useEffect` para buscar repositórios e usuários sempre que o `searchTerm` for alterado.  
Exibe as listas de repositórios e usuários, gerenciando estados de carregamento e erro.

**Type:** `React.FC<ListagemProps>`

### Parameters

- **searchTerm:** Termo de busca para filtrar os resultados.

_Returns a JSX element displaying search results (repositories and users)._

---

## 📡 fetchData

Realiza uma busca na API do GitHub com base no termo de busca fornecido e atualiza os estados de `repositories` e `users`.

### Parameters

- **query:** `string` – Termo de busca.

_Throws an Error if the API call fails._

_Returns the list of repositories and users from the API._

---

## 🚀 goToProfile

Navega para a página de perfil de um usuário do GitHub.

### Parameters

- **username:** `string` – Nome do usuário para navegação.

---

## 📝 Login Component

Componente de login da aplicação.  
Renderiza um formulário de login com campos para usuário e senha.  
Chama o hook `login` com as credenciais fornecidas e redireciona para `/listagem` se o login for bem-sucedido; caso contrário, exibe uma mensagem de erro.

**Type:** `React.FC`

_Returns a JSX element representing the login form._

---

## ⚙️ handleLogin

Função chamada ao submeter o formulário de login.  
Invoca o hook `login` com as credenciais fornecidas e redireciona para `/listagem` se o login for bem-sucedido; caso contrário, exibe uma mensagem de erro.

---

## 👤 Perfil

Componente de perfil do usuário do GitHub.  
Busca e exibe os dados do perfil, incluindo nome, avatar, bio, seguidores, seguindo, repositórios e localização.  
Também busca e exibe o README do repositório do usuário com estilo semelhante ao GitHub.

**Type:** `React.FC`

### Parameters

- **username:** Nome de usuário do GitHub para o perfil.

_Returns a JSX element representing the user's profile._

---

## 🔗 SingleGithub

Componente que exibe o perfil de um usuário do GitHub e lista seus repositórios públicos.

**Type:** `React.FC`

### Parameters

- **username:** Nome de usuário do GitHub.

_Returns a JSX element displaying the user's profile and repositories._

---

## 📂 fetchUserRepos

Busca os repositórios de um usuário do GitHub.

### Parameters

- **username:** `string` – Nome do usuário.

_Throws an Error if the API call fails._

_Returns a list of the user's repositories._

---

## 👤 fetchUserProfile

Busca o perfil de um usuário do GitHub.

### Parameters

- **username:** `string` – Nome do usuário.

_Throws an Error if the API call fails._

_Returns the user's profile data._

---

_This documentation was generated by [documentation.js](https://documentation.js.org/)._
