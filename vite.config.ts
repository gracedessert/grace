import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deployed to GitHub Pages at https://gracedessert.github.io/grace/
// The base path must match the repo name so assets resolve correctly.
export default defineConfig({
  base: '/grace/',
  plugins: [react()],
});
