import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environmentMatchGlobs: [['./src/http/**', './prisma/vitest-environment-prisma']],
    dir: 'src'
  }
})
