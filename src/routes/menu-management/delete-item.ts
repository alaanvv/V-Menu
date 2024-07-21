import { BadRequestError, ForbiddenError } from '../../errors'
import { get_menu_from_subcategory } from '../../utils/fetch-menu'
import { FastifyInstance } from 'fastify'
import { ssr_render } from '../../utils/render'
import { get_auth } from '../../utils/auth'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.delete('/item/:id', async (req, res) => {
    const schema = z.object({ id: z.string().cuid() })
    const { id } = schema.parse(req.params)

    if (!(await get_auth(req, id)))
      throw new ForbiddenError('No privileges.')

    let subcategory_id: string
    try {
      const item = await prisma.item.delete({ where: { id } })
      subcategory_id = item.subcategory_id

      await prisma.item.updateMany({
        where: { subcategory_id: item.subcategory_id, pos: { gt: item.pos } },
        data:  { pos: { decrement: 1 } }
      })
    }
    catch { throw new BadRequestError('Item not found.') }

    ssr_render(await get_menu_from_subcategory(subcategory_id))
    return res.status(204).send()
  })
}
