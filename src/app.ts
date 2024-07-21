import { BadRequestError, NotFoundError, ForbiddenError } from './errors'
import fastifyStatic from '@fastify/static'
import cors from '@fastify/cors'
import { ZodError } from 'zod'
import fastify from 'fastify'
import { glob } from 'glob'
import path from 'path'

export const app = fastify()

app.register(cors, { origin: '*' })
app.register(fastifyStatic, { root: path.join(process.cwd(), 'public') })

export async function load_routes() {
  const routes = glob.sync(path.join(__dirname, './routes/*/*'))
  await Promise.all(routes.map(async path => app.register((await import(`${path}`)).default)))
}

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError)
    return reply.status(400).send({ message: 'Validation error.', issues: error.issues })

  if (error instanceof BadRequestError)
    return reply.status(400).send({ message: error.message })

  if (error instanceof NotFoundError)
    return reply.status(404).send({ message: error.message })

  if (error instanceof ForbiddenError)
    return reply.status(403).send({ message: error.message })

  console.error(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})
