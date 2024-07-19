import { FastifyInstance } from 'fastify'
import { NotFoundError } from '../../errors'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.put('/logout', async (req, res) => {
    const bodySchema = z.object({
      session_id: z.string().cuid()
    })
    const { session_id } = bodySchema.parse(req.body)

    try   { await prisma.session.delete({ where: { id: session_id } }) }
    catch { throw new NotFoundError('Session not found.') }

    return res.status(204).send()
  })
}
