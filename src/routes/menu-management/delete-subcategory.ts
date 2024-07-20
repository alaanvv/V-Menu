import { BadRequestError, ForbiddenError } from '../../errors'
import { get_menu_from_subcategory } from '../../utils/fetch-menu'
import { ssr_render } from '../../utils/render'
import { FastifyInstance } from 'fastify'
import { get_auth } from '../../utils/auth'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.delete('/subcategory/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    if (!(await get_auth(req, id))) throw new ForbiddenError('No privileges.')

    try {
      const subcategory = await prisma.subcategory.delete({ where: { id } })

      await prisma.subcategory.updateMany({
        where: { category_id: subcategory.category_id, pos: { gt: subcategory.pos } },
        data:  { pos: { decrement: 1 } }
      })
    }
    catch { throw new BadRequestError('Subcategory not found.') }

    ssr_render(await get_menu_from_subcategory(id))
    return res.status(204).send()
  })
}
