import { app, load_routes } from './app'
import { env } from './env'

async function main() {
  await load_routes()
  app.listen({ host: env.HOST, port: env.PORT }, (_, addr) => console.log(`Server running at ${addr}`))
}

main()
