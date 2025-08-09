import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Detect environment
const isProd = process.env.NODE_ENV === 'production'

// https://vite.dev/config/
export default defineConfig({
    base: '/Lapis-Legit/', // ⬅️ sesuai nama repositori GitHub kamu
  plugins: [react(), tailwindcss()],
})
