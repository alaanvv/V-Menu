import { BadRequestError, ForbiddenError } from '../../errors'
import { get_menu_from_item } from '../../utils/fetch-menu'
import { ssr_render } from '../../utils/render'
import { FastifyInstance } from 'fastify'
import { get_auth } from '../../utils/auth'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.delete('/item/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    if (!(await get_auth(req, id))) throw new ForbiddenError('No privileges.')

    try {
      const item = await prisma.item.delete({ where: { id } })

      await prisma.item.updateMany({
        where: { subcategory_id: item.subcategory_id, pos: { gt: item.pos } },
        data:  { pos: { decrement: 1 } }
      })
    }
    catch { throw new BadRequestError('Item not found.') }

    ssr_render(await get_menu_from_item(id))
    return res.status(204).send()
  })
}
