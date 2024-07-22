import { FastifyInstance } from 'fastify'
import { ForbiddenError } from '../../errors'
import { is_trusted_ip } from '../../utils/auth'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/menu', async (req, res) => {
    const schema = z.object({
      username: z.string(),
      password: z.string(),
      name:     z.string(),
      phone:    z.optional(z.string()),
      whatsapp: z.optional(z.string()),
      address:  z.optional(z.string()),
      path:     z.string(),
      single_category: z.coerce.boolean()
    })
    const data = schema.parse(req.body)

    if (!(await is_trusted_ip(req)))
      throw new ForbiddenError('No privileges.')

    const menu: any = await prisma.menu.create({ data })

    delete menu.username
    delete menu.password

    return res.status(201).send({ menu })
  })
}
