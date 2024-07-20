import livereload from 'rollup-plugin-livereload'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
import svelte from 'rollup-plugin-svelte'
import babel from '@rollup/plugin-babel'
import autoprefixer from 'autoprefixer'
import { config } from 'dotenv'
config()

const production = process.env.NODE_ENV == 'production'

export default {
  input: 'web/main.js',
  output: {
    sourcemap: true,
    format: 'esm',
    dir: 'public/build'
  },

  plugins: [
    svelte({
      compilerOptions: { dev: !production },
      onwarn: (warning, handler) => { if (warning.code === 'a11y-autofocus') return	handler(warning) }
    }),
    postcss({
      plugins: [autoprefixer()],
      sourceMap: true
    }),
    resolve({
      preferBuiltins: true,
      browser: true,
      dedupe: ['svelte'],
      exportConditions: ['svelte']
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: [['@babel/preset-env', {
      targets: '> 0.25%, not dead, ie 11'
    }]],
      extensions: ['.js', '.html', '.svelte']
    }),
    !production && livereload('public'),
    production && terser()
  ],

  watch: { clearScreen: false	}
}
