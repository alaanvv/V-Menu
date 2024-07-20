import { NotFoundError, ForbiddenError } from '../../errors'
import { get_menu_from_category } from '../../utils/fetch-menu'
import { ssr_render } from '../../utils/render'
import { FastifyInstance } from 'fastify'
import { get_auth } from '../../utils/auth'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/category/:id', async (req, res) => {
    const bodySchema  = z.object({ name: z.string() })
    const paramSchema = z.object({ id:   z.string().cuid() })

    const data   = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)

    if (!(await get_auth(req, id))) throw new ForbiddenError('No privileges.')

    if (!await prisma.menu.findUnique({ where: { id } }))
      throw new NotFoundError('Menu not found.')

    const max_pos = await prisma.category.aggregate({
      where: { menu_id: id },
      _max: { pos: true }
    })

    const pos = (max_pos._max.pos || 0) + 1

    const category = await prisma.category.create({ data: { ...data, menu_id: id, pos } })

    ssr_render(await get_menu_from_category(category.id))
    return res.status(201).send({ category })
  })
}
