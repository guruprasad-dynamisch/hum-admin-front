import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // Use modern Sass API
        silenceDeprecations: ['legacy-js-api'], // Silence the deprecation warning
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
