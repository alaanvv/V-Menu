import { BadRequestError, NotFoundError, ForbiddenError } from '../../errors'
import { get_menu_from_item } from '../../utils/fetch-menu'
import { FastifyInstance } from 'fastify'
import { ssr_render } from '../../utils/render'
import { get_auth } from '../../utils/auth'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.put('/raise-item/:id', async (req, res) => {
    const schema = z.object({ id: z.string().cuid() })
    const { id } = schema.parse(req.params)

    if (!(await get_auth(req, id)))
      throw new ForbiddenError('No privileges.')

    const item = await prisma.item.findUnique({ where: { id } })

    if (!item)
      throw new NotFoundError('Item not found.')

    if (item.pos == 1)
      throw new BadRequestError('Already on top.')

    await prisma.item.updateMany({
      where: {
        subcategory_id: item.subcategory_id,
        pos: item.pos - 1,
      },
      data: { pos: { increment: 1 } }
    })

    await prisma.item.update({
      where: { id },
      data: { pos: { decrement: 1 } }
    })

    ssr_render(await get_menu_from_item(id))
    return res.status(204).send({ item })
  })
}
