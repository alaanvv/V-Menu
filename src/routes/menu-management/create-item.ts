import { NotFoundError, ForbiddenError } from '../../errors'
import { get_menu_from_item } from '../../utils/fetch-menu'
import { FastifyInstance } from 'fastify'
import { ssr_render } from '../../utils/render'
import { get_auth } from '../../utils/auth'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/item/:id', async (req, res) => {
    const body_schema  = z.object({
      name:           z.string(),
      description:    z.optional(z.string()),
      price_in_cents: z.number().int().min(1),
    })
    const param_schema = z.object({ id: z.string().cuid() })

    const data   = body_schema.parse(req.body)
    const { id } = param_schema.parse(req.params)

    if (!(await get_auth(req, id)))
      throw new ForbiddenError('No privileges.')

    const pos = ((await prisma.item.aggregate({
      where: { subcategory_id: id },
      _max: { pos: true }
    }))._max.pos || 0) + 1

    let item: any
    try   { item = await prisma.item.create({ data: { ...data, subcategory_id: id, pos } }) }
    catch { throw new NotFoundError('Subcategory not found.') }

    ssr_render(await get_menu_from_item(item.id))
    return res.status(201).send({ item })
  })
}
