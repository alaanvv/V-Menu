import { NotFoundError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.get('/menu/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    const menu = await prisma.menu.findUnique({ where: { id } })
    if (!menu)
      throw new NotFoundError('Menu not found.')

    const categories = await prisma.category.findMany({ where: { menu_id: id }, orderBy: { pos: 'asc' } })

    for (let i in categories) {
      const subcategories = await prisma.subcategory.findMany({ where: { category_id: categories[i].id }, orderBy: { pos: 'asc' } })
      ;(categories[i] as any).subcategories = subcategories

      for (let i in subcategories) {
        const items = await prisma.item.findMany({ where: { subcategory_id: subcategories[i].id }, orderBy: { pos: 'asc' } })
        ;(subcategories[i] as any).items = items
      }
    }

    (menu as any).categories = categories
    delete (menu as any).username
    delete (menu as any).password

    return res.status(200).send({ menu })
  })
}
