import { BadRequestError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.delete('/subcategory/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    try {
      const subcategory = await prisma.subcategory.delete({ where: { id } })

      await prisma.subcategory.updateMany({
        where: { category_id: subcategory.category_id, pos: { gt: subcategory.pos } },
        data:  { pos: { decrement: 1 } }
      })
    }
    catch { throw new BadRequestError('Subcategory not found.') }

    return res.status(204).send()
  })
}
