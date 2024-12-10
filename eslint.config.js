import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser'; // Importa o parser correto

export default [
  {
    ignores: ['dist'], // Ignorar a pasta de saída
  },
  {
    files: ['**/*.{ts,tsx}'], // Aplica regras apenas para arquivos TypeScript
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser, // Configura o parser para TypeScript
    },
    plugins: {
      '@typescript-eslint': tseslint, // Ativa o plugin do TypeScript
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Regras recomendadas para React Hooks
      ...tseslint.configs.recommended.rules, // Regras recomendadas para TypeScript
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/explicit-module-boundary-types': 'off', // ou 'warn' se preferir
      'react/react-in-jsx-scope': 'off', // Não é mais necessário com o React 17+ JSX Transform
    },
  },
  {
    files: ['**/*.{js,jsx}'], // Regras para arquivos JavaScript
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      ...js.configs.recommended.rules, // Regras recomendadas do ESLint para JS
    },
  },
];
