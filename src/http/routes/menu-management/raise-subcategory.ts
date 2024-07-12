import { BadRequestError, NotFoundError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.put('/raise-subcategory/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    const subcategory = await prisma.subcategory.findUnique({ where: { id } })
    if (!subcategory)
      throw new NotFoundError('Subcategory not found.')

    if (subcategory.pos == 1)
      throw new BadRequestError('Already on top.')

    await prisma.subcategory.updateMany({
      where: {
        category_id: subcategory.category_id,
        pos: subcategory.pos - 1
      },
      data: {
        pos: { increment: 1 }
      }
    })

    await prisma.subcategory.update({
      where: { id },
      data: { pos: { decrement: 1 } }
    })

    return res.status(204).send({ subcategory })
  })
}
