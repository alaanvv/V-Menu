import { BadRequestError, NotFoundError, ForbiddenError } from '../../errors'
import { get_menu_from_subcategory } from '../../utils/fetch-menu'
import { ssr_render } from '../../utils/render'
import { FastifyInstance } from 'fastify'
import { get_auth } from '../../utils/auth'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.put('/raise-subcategory/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    if (!(await get_auth(req, id))) throw new ForbiddenError('No privileges.')

    const subcategory = await prisma.subcategory.findUnique({ where: { id } })
    if (!subcategory)
      throw new NotFoundError('Subcategory not found.')

    if (subcategory.pos == 1)
      throw new BadRequestError('Already on top.')

    await prisma.subcategory.updateMany({
      where: {
        category_id: subcategory.category_id,
        pos: subcategory.pos - 1
      },
      data: {
        pos: { increment: 1 }
      }
    })

    await prisma.subcategory.update({
      where: { id },
      data: { pos: { decrement: 1 } }
    })

    ssr_render(await get_menu_from_subcategory(id))
    return res.status(204).send({ subcategory })
  })
}
