import livereload from 'rollup-plugin-livereload'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import svelte from 'rollup-plugin-svelte'
import css from 'rollup-plugin-css-only'
import 'dotenv/config'

const production = process.env.NODE_ENV == 'production'

export default {
  input: 'web/main.js',
  output: {
    format: 'esm',
    dir: 'public/build'
  },
  plugins: [
    svelte({
      compilerOptions: { dev: !production },
      onwarn: (warning, handler) => { if (warning.code === 'a11y-autofocus') return	handler(warning) }
    }),
    css({ output: 'bundle.css' }),
    resolve({
      preferBuiltins: true,
      browser: true,
      dedupe: ['svelte'],
      exportConditions: ['svelte']
    }),
    commonjs(),
    !production && livereload('public'),
    production && terser()
  ],
  watch: { clearScreen: true }
}
