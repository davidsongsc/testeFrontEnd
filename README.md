# Projeto Dashboard

Uma aplicação de exemplo para demonstrar autenticação, navegação e consumo da API do GitHub utilizando React, React Router e Ant Design.

> **Nota:**  
> Esta documentação foi gerada automaticamente pelo [documentation.js](https://documentation.js.org/).  
> Atualize a documentação modificando os comentários no código.

---

## 📚 Sumário

- [PrivateRoute](#privateroute)
  - [Parâmetros](#parâmetros)
- [AppContent](#appcontent)
  - [Parâmetros](#parâmetros-1)
- [App](#app)
- [Header](#header)
- [SideMenu](#sidemenu)
  - [Parâmetros](#parâmetros-2)
- [confirmSearch](#confirmsearch)
- [AuthProvider](#authprovider)
  - [Parâmetros](#parâmetros-3)
- [login](#login)
  - [Parâmetros](#parâmetros-4)
- [logout](#logout)
- [useAuth](#useauth)
- [Listagem](#listagem)
  - [Parâmetros](#parâmetros-5)
- [fetchData](#fetchdata)
  - [Parâmetros](#parâmetros-6)
- [goToProfile](#gotoprofile)
  - [Parâmetros](#parâmetros-7)
- [Componente de Login](#componente-de-login)
- [handleLogin](#handlelogin)
- [Perfil](#perfil)
  - [Parâmetros](#parâmetros-8)
- [SingleGithub](#singlegithub)
  - [Parâmetros](#parâmetros-9)
- [fetchUserRepos](#fetchuserrepos)
  - [Parâmetros](#parâmetros-10)
- [fetchUserProfile](#fetchuserprofile)
  - [Parâmetros](#parâmetros-11)
- [Como Instalar e Executar o Projeto](#como-instalar-e-executar-o-projeto)

---

## 🔒 PrivateRoute

Protege uma rota, renderizando seu conteúdo somente se o usuário estiver autenticado. Caso contrário, redireciona para a raiz (`/`).

**Tipo:** `React.FC<{ children: React.ReactNode }>`  

### Parâmetros

- **children:** Elemento JSX que será renderizado se o usuário estiver autenticado.

_Retorna um elemento JSX representando a rota protegida._

---

## 📦 AppContent

Componente que renderiza o conteúdo da aplicação, gerenciando rotas públicas e protegidas.

**Tipo:** `React.FC<{ searchTerm: string }>`  

### Parâmetros

- **searchTerm:** Termo de busca para a listagem.

_Retorna um elemento JSX representando a área principal de conteúdo._

---

## 🚀 App

Componente principal da aplicação.  
Configura o Router com o AuthProvider, SideMenu e a área de conteúdo.

**Tipo:** `React.FC`

_Retorna um elemento JSX representando a aplicação inteira._

---

## 📰 Header

Componente de cabeçalho da aplicação.  
Renderiza um header com fundo branco, texto preto e um ícone de menu na lateral esquerda.

**Tipo:** `React.FC`

_Retorna um elemento JSX representando o cabeçalho._

---

## 📑 SideMenu

Componente de menu lateral que oferece navegação e funcionalidades de pesquisa.  
Exibe diferentes opções de menu com base no estado de autenticação do usuário e ajusta seu layout conforme o estado de colapso.

**Tipo:** `React.FC<SideMenuProps>`

### Parâmetros

- **collapsed:** Indica se o menu lateral está colapsado.
- **onCollapse:** Função chamada quando o menu é colapsado ou expandido.
- **onSearchChange:** Função chamada para atualizar o termo de busca quando a pesquisa é confirmada.

_Retorna um elemento JSX representando o menu lateral com opções de navegação e um campo de pesquisa._

---

## 🔍 confirmSearch

Confirma a pesquisa e chama a função `onSearchChange` com o valor atual do `localSearchTerm`.

---

## 🔐 AuthProvider

Provider do React Context responsável por armazenar o estado de autenticação do usuário e fornecer as funções de login e logout.

**Tipo:** `React.FC<{ children: React.ReactNode }>`  

### Parâmetros

- **children:** Elemento JSX a ser renderizado dentro do contexto de autenticação.

_Retorna o elemento JSX representando o contexto de autenticação._

---

## 👤 login

Realiza o login com base nas credenciais fornecidas.

### Parâmetros

- **username:** `string` – Nome de usuário.
- **password:** `string` – Senha.

_Retorna `boolean`: `true` se o login for bem-sucedido, `false` caso contrário._

---

## 🚪 logout

Realiza o logout do usuário.  
Define o estado de autenticação como falso e remove o usuário do estado e do localStorage.

---

## 🔑 useAuth

Hook que fornece o contexto de autenticação atual.

_Lança um erro se utilizado fora de um AuthProvider._

_Retorna o contexto de autenticação, incluindo as funções de login e logout._

---

## 🔎 Listagem

Componente que exibe os resultados da busca na API do GitHub.  
Utiliza `useEffect` para buscar repositórios e usuários sempre que o `searchTerm` for alterado.  
Exibe as listas de repositórios e usuários, gerenciando estados de carregamento e erro.

**Tipo:** `React.FC<ListagemProps>`

### Parâmetros

- **searchTerm:** Termo de busca para filtrar os resultados.

_Retorna um elemento JSX exibindo os resultados da busca (repositórios e usuários)._

---

## 📡 fetchData

Realiza uma busca na API do GitHub com base no termo de busca fornecido e atualiza os estados de `repositories` e `users`.

### Parâmetros

- **query:** `string` – Termo de busca.

_Lança um erro se a chamada à API falhar._

_Retorna a lista de repositórios e usuários obtida na API._

---

## 🚀 goToProfile

Navega para a página de perfil de um usuário do GitHub.

### Parâmetros

- **username:** `string` – Nome do usuário para navegação.

---

## 📝 Componente de Login

Componente de login da aplicação.  
Renderiza um formulário de login com campos para usuário e senha.  
Chama o hook `login` com as credenciais fornecidas e redireciona para `/listagem` se o login for bem-sucedido; caso contrário, exibe uma mensagem de erro.

**Tipo:** `React.FC`

_Retorna um elemento JSX representando o formulário de login._

---

## ⚙️ handleLogin

Função chamada ao submeter o formulário de login.  
Invoca o hook `login` com as credenciais fornecidas e redireciona para `/listagem` se o login for bem-sucedido; caso contrário, exibe uma mensagem de erro.

---

## 👤 Perfil

Componente de perfil do usuário do GitHub.  
Busca e exibe os dados do perfil, incluindo nome, avatar, bio, seguidores, seguindo, repositórios e localização.  
Também busca e exibe o README do repositório do usuário com estilo semelhante ao GitHub.

**Tipo:** `React.FC`

### Parâmetros

- **username:** Nome de usuário do GitHub para o perfil.

_Retorna um elemento JSX representando o perfil do usuário._

---

## 🔗 SingleGithub

Componente que exibe o perfil de um usuário do GitHub e lista seus repositórios públicos.

**Tipo:** `React.FC`

### Parâmetros

- **username:** Nome de usuário do GitHub.

_Retorna um elemento JSX exibindo o perfil do usuário e seus repositórios._

---

## 📂 fetchUserRepos

Busca os repositórios de um usuário do GitHub.

### Parâmetros

- **username:** `string` – Nome do usuário.

_Lança um erro se a chamada à API falhar._

_Retorna uma lista dos repositórios do usuário._

---

## 👤 fetchUserProfile

Busca o perfil de um usuário do GitHub.

### Parâmetros

- **username:** `string` – Nome do usuário.

_Lança um erro se a chamada à API falhar._

_Retorna os dados do perfil do usuário._

---

## 🚀 Como Instalar e Executar o Projeto

### Pré-requisitos

- **Node.js** (versão 14 ou superior recomendada)
- **npm** ou **yarn**

### Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git

2. Acesse o diretório do projeto:
   ```bash
   cd nome-do-repositorio
3. Instale as dependências:
   npm install

4. Execução
Para iniciar a aplicação em modo de desenvolvimento, execute:

Usando npm:
   ```bash
   npm run dev
