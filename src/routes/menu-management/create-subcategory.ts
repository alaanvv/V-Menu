import { NotFoundError, ForbiddenError } from '../../errors'
import { get_menu_from_subcategory } from '../../utils/fetch-menu'
import { ssr_render } from '../../utils/render'
import { FastifyInstance } from 'fastify'
import { get_auth } from '../../utils/auth'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/subcategory/:id', async (req, res) => {
    const bodySchema  = z.object({ name: z.string() })
    const paramSchema = z.object({ id:   z.string().cuid() })

    const data   = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)

    if (!(await get_auth(req, id))) throw new ForbiddenError('No privileges.')

    if (!await prisma.category.findUnique({ where: { id } }))
      throw new NotFoundError('Category not found.')

    const max_pos = await prisma.subcategory.aggregate({
      where: { category_id: id },
      _max: { pos: true }
    })

    const pos = (max_pos._max.pos || 0) + 1

    const subcategory = await prisma.subcategory.create({ data: { ...data, category_id: id, pos } })

    ssr_render(await get_menu_from_subcategory(subcategory.id))
    return res.status(201).send({ subcategory })
  })
}
