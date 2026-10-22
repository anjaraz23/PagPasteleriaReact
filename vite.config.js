import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxInject: `import React from 'react'`, // Inyecta la importación automáticamente durante los tests
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/utils/setupTests.js',
  },
})