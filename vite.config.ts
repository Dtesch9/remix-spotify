import { reactRouter } from '@react-router/dev/vite';
import tailwind from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  plugins: [tailwind(), reactRouter(), tsconfigPaths()],
});
