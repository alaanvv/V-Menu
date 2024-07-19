import livereload from 'rollup-plugin-livereload'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
import svelte from 'rollup-plugin-svelte'
import babel from '@rollup/plugin-babel'
import autoprefixer from 'autoprefixer'
import { config } from 'dotenv'

const to_replace = {}
for (let [k, v] of Object.entries(config().parsed))
  to_replace[`process.env.${k}`] = `'${v}'`

const production = process.env.NODE_ENV == 'production'

export default {
  input: 'web/main.js',
  output: {
    sourcemap: true,
    format: 'esm',
    dir: 'public/build'
  },

  plugins: [
    replace({
      include: ['web/**/*.js', 'web/**/*.ts', 'web/**/*.svelte'],
      preventAssignment: true,
      values: to_replace
    }),
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
