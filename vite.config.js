import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.js',
    include: ['src/__tests__/*/.test.{js,jsx}'], // include your folder
    coverage: {
      reporter: ['text', 'html']
    }
  }
})