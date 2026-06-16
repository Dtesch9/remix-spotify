import { defineConfig } from 'oxfmt';

export default defineConfig({
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  sortPackageJson: false,
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
