import { FastifyInstance } from 'fastify'
import { NotFoundError } from '../../errors'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/category/:id', async (req, res) => {
    const bodySchema  = z.object({ name: z.string() })
    const paramSchema = z.object({ id:   z.string().cuid() })

    const data   = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)

    if (!await prisma.menu.findUnique({ where: { id } }))
      throw new NotFoundError('Menu not found.')

    const category = await prisma.category.create({ data: { ...data, menu_id: id } })

    return res.status(201).send({ category })
  })
}
