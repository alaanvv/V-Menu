import { BadRequestError, NotFoundError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.put('/raise-item/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    const item = await prisma.item.findUnique({ where: { id } })
    if (!item)
      throw new NotFoundError('Item not found.')

    if (item.pos == 1)
      throw new BadRequestError('Already on top.')

    await prisma.item.updateMany({
      where: {
        subcategory_id: item.subcategory_id,
        pos: { gte: item.pos - 1 },
        NOT: { id }
      },
      data: {
        pos: { increment: 1 }
      }
    })

    await prisma.item.update({
      where: { id },
      data: { pos: { decrement: 1 } }
    })

    return res.status(204).send({ item })
  })
}
