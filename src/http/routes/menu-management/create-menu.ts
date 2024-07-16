import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/menu', async (req, res) => {
    const bodySchema = z.object({
      username: z.string(),
      password: z.string(),
      name:     z.string(),
      phone:    z.string(),
      whatsapp: z.string(),
      address:  z.string()
    })
    const data = bodySchema.parse(req.body)

    const menu = await prisma.menu.create({ data })

    delete (menu as any).username
    delete (menu as any).password

    return res.status(201).send({ menu })
  })
}
