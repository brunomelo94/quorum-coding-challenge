import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['backend/src/tests/**/*.test.js'], // Only include tests from backend/tests/
  },
});
