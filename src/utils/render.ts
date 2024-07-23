import postcssPresetEnv from 'postcss-preset-env'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
require('svelte/register')
import fs from 'fs'

export async function ssr_render(menu: any) {
  const App = require(`../../web/routes/menus/${menu.path}/Menu.svelte`).default
  const result = App.render({ menu })

  const prefixed_css = (await postcss([autoprefixer, postcssPresetEnv({ stage: 3, browsers: 'last 10 versions' })]).process(result.css.code, { from: undefined })).css

  fs.writeFileSync(`./public/m/${menu.path}/index.html`,
    `<!DOCTYPE html>
    <html lang='pt-BR'>
      <head>
      	<meta charset='utf-8'>
      	<meta name='viewport' content='width=device-width,initial-scale=1'>
      	<link rel='stylesheet' href='/assets/css/global.css'>
        <link rel='icon' href='/assets/img/favicon.png' />
      	<title> ${menu.name} </title>
        ${result.head}
        <style> ${prefixed_css} </style>
      </head>
      <body> ${result.html} </body>
    </html>`
  )
}
