import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import svgr from '@svgr/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          motion: ['motion/react'],
          games: [
            './src/app/components/PacManGame.tsx',
            './src/app/components/NeonRunnerGame.tsx',
            './src/app/components/SwitchNShootGame.tsx',
            './src/app/components/MazeOfKingsGame.tsx',
            './src/app/components/PixelRacerGame.tsx',
          ],
        },
      },
    },
  },
})
