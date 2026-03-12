import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    server: {
      deps: {
        inline: ['@boardzilla/core'],
      },
    },
    setupFiles: ['./test/setup.ts'],
  },
});
