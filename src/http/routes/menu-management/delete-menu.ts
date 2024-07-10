import { BadRequestError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.delete('/menu/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    try   { await prisma.menu.delete({ where: { id } }) }
    catch { throw new BadRequestError('Menu not found.') }

    return res.status(204).send()
  })
}
