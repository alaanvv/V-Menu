import { BadRequestError, NotFoundError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.put('/menu/:id', async (req, res) => {
    const bodySchema = z.object({
      name:     z.optional(z.string()),
      phone:    z.optional(z.string()),
      whatsapp: z.optional(z.string()),
      address:  z.optional(z.string())
    })
    const paramSchema = z.object({ id: z.string().cuid() })

    const data = bodySchema.parse(req.body) as { [key: string]: any }
    const { id } = paramSchema.parse(req.params)

    for (let entry of Object.entries(data))
      if (entry[1] === null)
        delete data[entry[0]]

    if (!Object.entries(data).length)
      throw new BadRequestError('Sent no data.')

    let menu
    try   { menu = await prisma.menu.update({ where: { id }, data }) }
    catch { throw new NotFoundError('Menu not found.') }

    return res.status(204).send({ menu })
  })
}
