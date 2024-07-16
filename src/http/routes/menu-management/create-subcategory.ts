import { FastifyInstance } from 'fastify'
import { NotFoundError } from '../../errors'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/subcategory/:id', async (req, res) => {
    const bodySchema  = z.object({ name: z.string() })
    const paramSchema = z.object({ id:   z.string().cuid() })

    const data   = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)

    if (!await prisma.category.findUnique({ where: { id } }))
      throw new NotFoundError('Category not found.')

    const max_pos = await prisma.subcategory.aggregate({
      where: { category_id: id },
      _max: { pos: true }
    })

    const pos = (max_pos._max.pos || 0) + 1

    const subcategory = await prisma.subcategory.create({ data: { ...data, category_id: id, pos } })

    return res.status(201).send({ subcategory })
  })
}
