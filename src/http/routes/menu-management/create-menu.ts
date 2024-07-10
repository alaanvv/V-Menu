import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/menu', async (req, res) => {
    const bodySchema = z.object({
      name:     z.string(),
      phone:    z.string(),
      whatsapp: z.string(),
      address:  z.string()
    })
    const data = bodySchema.parse(req.body)

    const menu = await prisma.menu.create({ data })

    return res.status(201).send({ menu })
  })
}
