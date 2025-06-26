import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/NexusGadgets/', // Your GitHub repo name here (case-sensitive)
});

