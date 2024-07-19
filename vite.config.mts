import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environmentMatchGlobs: [['./src/**', './prisma/vitest-environment-prisma']],
    dir: 'src'
  }
})
