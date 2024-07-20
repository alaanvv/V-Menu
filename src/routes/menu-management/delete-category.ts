import { BadRequestError, ForbiddenError } from '../../errors'
import { get_menu_from_category } from '../../utils/fetch-menu'
import { FastifyInstance } from 'fastify'
import { ssr_render } from '../../utils/render'
import { get_auth } from '../../utils/auth'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.delete('/category/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    if (!(await get_auth(req, id))) throw new ForbiddenError('No privileges.')

    try {
      const category = await prisma.category.delete({ where: { id } })

      await prisma.category.updateMany({
        where: { menu_id: category.menu_id, pos: { gt: category.pos } },
        data:  { pos: { decrement: 1 } }
      })
    }
    catch { throw new BadRequestError('Category not found.') }

    ssr_render(await get_menu_from_category(id))
    return res.status(204).send()
  })
}
