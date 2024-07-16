import { FastifyInstance } from 'fastify'
import { ForbiddenError } from '../../errors'
import { is_trusted_ip } from '../../utils/auth'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/menu', async (req, res) => {
    const bodySchema = z.object({
      username: z.string(),
      password: z.string(),
      name:     z.string(),
      phone:    z.optional(z.string()),
      whatsapp: z.optional(z.string()),
      address:  z.optional(z.string())
    })
    const data = bodySchema.parse(req.body)

    if (!(await is_trusted_ip(req))) throw new ForbiddenError('No privileges.')

    const menu = await prisma.menu.create({ data })

    delete (menu as any).username
    delete (menu as any).password

    return res.status(201).send({ menu })
  })
}
