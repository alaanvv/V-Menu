import { FastifyInstance } from 'fastify'
import { NotFoundError } from '../../errors'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.put('/logout', async (req, res) => {
    const schema = z.object({ session_id: z.string().cuid() })
    const { session_id } = schema.parse(req.body)

    try   { await prisma.session.delete({ where: { id: session_id } }) }
    catch { throw new NotFoundError('Session not found.') }

    return res.status(204).send()
  })
}
