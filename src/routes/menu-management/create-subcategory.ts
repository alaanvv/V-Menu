import { NotFoundError, ForbiddenError } from '../../errors'
import { get_menu_from_subcategory } from '../../utils/fetch-menu'
import { FastifyInstance } from 'fastify'
import { ssr_render } from '../../utils/render'
import { get_auth } from '../../utils/auth'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/subcategory/:id', async (req, res) => {
    const body_schema  = z.object({ name: z.string() })
    const param_schema = z.object({ id:   z.string().cuid() })

    const data   = body_schema.parse(req.body)
    const { id } = param_schema.parse(req.params)

    if (!(await get_auth(req, id))) throw new ForbiddenError('No privileges.')

    const pos = ((await prisma.subcategory.aggregate({
      where: { category_id: id },
      _max: { pos: true }
    }))._max.pos || 0) + 1


    let subcategory: any
    try   { subcategory = await prisma.subcategory.create({ data: { ...data, category_id: id, pos } }) }
    catch { throw new NotFoundError('Category not found.') }

    ssr_render(await get_menu_from_subcategory(subcategory.id))
    return res.status(201).send({ subcategory })
  })
}
