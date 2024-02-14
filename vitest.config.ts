import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // See the list of config options in the Config Reference:
    // https://vitest.dev/config/
    globals: true,
    environment: 'jsdom',
    includeSource: ['app/**/*.{ts,tsx}'],
    exclude: ['node_modules', 'e2e/*'],
    coverage: {
      reporter: process.env.CI ? 'json' : 'html-spa',
    },
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'app'),
    },
  },
  plugins: [react()],
});
