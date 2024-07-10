import { BadRequestError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.delete('/subcategory/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    try   { await prisma.subcategory.delete({ where: { id } }) }
    catch { throw new BadRequestError('Subcategory not found.') }

    return res.status(204).send()
  })
}
