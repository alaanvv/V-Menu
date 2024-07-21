import { BadRequestError, NotFoundError, ForbiddenError } from '../../errors'
import { get_menu_from_item } from '../../utils/fetch-menu'
import { ssr_render } from '../../utils/render'
import { FastifyInstance } from 'fastify'
import { get_auth } from '../../utils/auth'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.put('/item/:id', async (req, res) => {
    const body_schema  = z.object({
      name:           z.optional(z.string()),
      description:    z.optional(z.string()),
      price_in_cents: z.optional(z.number().int().min(1))
    })
    const param_schema = z.object({ id: z.string().cuid() })

    const data: any = body_schema.parse(req.body)
    const { id } = param_schema.parse(req.params)

    if (!(await get_auth(req, id)))
      throw new ForbiddenError('No privileges.')

    for (let entry of Object.entries(data))
      if (entry[1] === null)
        delete data[entry[0]]

    if (!Object.entries(data).length)
      throw new BadRequestError('Sent no data.')

    let item: any
    try   { item = await prisma.item.update({ where: { id }, data }) }
    catch { throw new NotFoundError('Item not found.') }

    ssr_render(await get_menu_from_item(id))
    return res.status(204).send({ item })
  })
}
