import { BadRequestError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.delete('/item/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    try {
      const item = await prisma.item.delete({ where: { id } })

      await prisma.item.updateMany({
        where: { subcategory_id: item.subcategory_id, pos: { gt: item.pos } },
        data:  { pos: { decrement: 1 } }
      })
    }
    catch { throw new BadRequestError('Item not found.') }

    return res.status(204).send()
  })
}
