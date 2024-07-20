import { NotFoundError, ForbiddenError } from '../../errors'
import { get_menu_from_item } from '../../utils/fetch-menu'
import { ssr_render } from '../../utils/render'
import { FastifyInstance } from 'fastify'
import { get_auth } from '../../utils/auth'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/item/:id', async (req, res) => {
    const bodySchema  = z.object({
      name:           z.string(),
      description:    z.optional(z.string()),
      price_in_cents: z.number().int().min(1),
    })
    const paramSchema = z.object({ id: z.string().cuid() })

    const data   = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)

    if (!(await get_auth(req, id))) throw new ForbiddenError('No privileges.')

    if (!await prisma.subcategory.findUnique({ where: { id } }))
      throw new NotFoundError('Subcategory not found.')

    const max_pos = await prisma.item.aggregate({
      where: { subcategory_id: id },
      _max: { pos: true }
    })

    const pos = (max_pos._max.pos || 0) + 1

    const item = await prisma.item.create({ data: { ...data, subcategory_id: id, pos } })

    ssr_render(await get_menu_from_item(item.id))
    return res.status(201).send({ item })
  })
}
