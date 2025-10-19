import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // base path for GitHub Pages (owner: ozairkhan2810, repo: timespent)
  base: '/timespent',
  plugins: [react()],
})
