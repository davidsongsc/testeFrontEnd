module.exports = {
  preset: 'ts-jest', // Usa ts-jest para processar arquivos TypeScript
  testEnvironment: 'jsdom', // Define o ambiente de teste como jsdom
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], // Carrega o arquivo de configuração global
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Ignora arquivos CSS/SCSS durante os testes
  },
};