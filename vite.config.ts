import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative asset paths make the build work on GitHub Pages
  // whether the repository is a project site or a user site.
  base: './',
});
