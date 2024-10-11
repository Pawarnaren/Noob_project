import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  // Uncomment or remove this block if you are no longer using the proxy
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://noob-project-backend.onrender.com/', 
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
})
