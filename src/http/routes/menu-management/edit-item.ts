import { BadRequestError, NotFoundError, ForbiddenError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { get_auth } from '../../utils/auth'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.put('/item/:id', async (req, res) => {
    const bodySchema  = z.object({
      name:           z.optional(z.string()),
      description:    z.optional(z.string()),
      price_in_cents: z.optional(z.number().int().min(1))
    })
    const paramSchema = z.object({ id: z.string().cuid() })

    const data = bodySchema.parse(req.body) as { [key: string]: any }
    const { id } = paramSchema.parse(req.params)

    if (!(await get_auth(req, id))) throw new ForbiddenError('No privileges.')

    for (let entry of Object.entries(data))
      if (entry[1] === null)
        delete data[entry[0]]

    if (!Object.entries(data).length)
      throw new BadRequestError('Sent no data.')

    let item
    try   { item = await prisma.item.update({ where: { id }, data }) }
    catch { throw new NotFoundError('Item not found.') }

    return res.status(204).send({ item })
  })
}
