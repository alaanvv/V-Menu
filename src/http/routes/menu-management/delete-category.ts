import { BadRequestError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.delete('/category/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    try {
      const category = await prisma.category.delete({ where: { id } })

      await prisma.category.updateMany({
        where: { menu_id: category.menu_id, pos: { gt: category.pos } },
        data:  { pos: { decrement: 1 } }
      })
    }
    catch { throw new BadRequestError('Category not found.') }

    return res.status(204).send()
  })
}
