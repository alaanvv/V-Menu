import { BadRequestError, NotFoundError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.put('/raise-category/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    const category = await prisma.category.findUnique({ where: { id } })
    if (!category)
      throw new NotFoundError('Category not found.')

    if (category.pos == 1)
      throw new BadRequestError('Already on top.')

    await prisma.category.updateMany({
      where: {
        menu_id: category.menu_id,
        pos: { gte: category.pos - 1 },
        NOT: { id }
      },
      data: {
        pos: { increment: 1 }
      }
    })

    await prisma.category.update({
      where: { id },
      data: { pos: { decrement: 1 } }
    })

    return res.status(204).send({ category })
  })
}
