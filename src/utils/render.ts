require('svelte/register')
import fs from 'fs'

export function ssr_render(menu: any) {
  console.log(menu)
  const App = require(`../../web/routes/menus/${menu.path}/Menu.svelte`).default
  const result = App.render({ menu })

  fs.writeFileSync(`./public/m/${menu.path}/index.html`,
  `<!DOCTYPE html>
  <html lang="en">
    <head>
    	<meta charset='utf-8'>
    	<meta name='viewport' content='width=device-width,initial-scale=1'>
    	<link rel='stylesheet' href='../../assets/css/global.css'>
    	<title> ${menu.name} </title>
      ${result.head}
      <style> ${result.css.code} </style>
    </head>
    <body> ${result.html} </body>
  </html>`)
}
