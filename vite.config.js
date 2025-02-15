import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.lottie'], // Handle .lottie files as assets
});
