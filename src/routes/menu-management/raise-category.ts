import { BadRequestError, NotFoundError, ForbiddenError } from '../../errors'
import { get_menu_from_category } from '../../utils/fetch-menu'
import { FastifyInstance } from 'fastify'
import { ssr_render } from '../../utils/render'
import { get_auth } from '../../utils/auth'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.put('/raise-category/:id', async (req, res) => {
    const schema = z.object({ id: z.string().cuid() })
    const { id } = schema.parse(req.params)

    if (!(await get_auth(req, id)))
      throw new ForbiddenError('No privileges.')

    const category = await prisma.category.findUnique({ where: { id } })

    if (!category)
      throw new NotFoundError('Category not found.')

    if (category.pos == 1)
      throw new BadRequestError('Already on top.')

    await prisma.category.updateMany({
      where: {
        menu_id: category.menu_id,
        pos: category.pos - 1,
      },
      data: {
        pos: { increment: 1 }
      }
    })

    await prisma.category.update({
      where: { id },
      data: { pos: { decrement: 1 } }
    })

    ssr_render(await get_menu_from_category(id))
    return res.status(204).send({ category })
  })
}
