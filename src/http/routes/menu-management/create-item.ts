import { FastifyInstance } from 'fastify'
import { NotFoundError } from '../../errors'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/item/:id', async (req, res) => {
    const bodySchema  = z.object({
      name:           z.string(),
      description:    z.string(),
      price_in_cents: z.number().int().min(1),
    })
    const paramSchema = z.object({ id: z.string().cuid() })

    const data   = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)

    if (!await prisma.subcategory.findUnique({ where: { id } }))
      throw new NotFoundError('Subcategory not found.')

    const item = await prisma.item.create({ data: { ...data, subcategory_id: id } })

    return res.status(201).send({ item })
  })
}
