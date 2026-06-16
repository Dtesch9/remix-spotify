import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['import', 'react', 'typescript', 'unicorn', 'oxc', 'jsx-a11y', 'node'],
  categories: {
    correctness: 'error',
    suspicious: 'warn',
  },
  rules: {
    'import/no-unassigned-import': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  env: {
    builtin: true,
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: '18.3.1',
    },
  },
  ignorePatterns: [
    'node_modules/**',
    'build/**',
    '.output/**',
    '.tanstack/**',
    '.tamagui/**',
    '.react-router/**',
    'public/build/**',
  ],
});
