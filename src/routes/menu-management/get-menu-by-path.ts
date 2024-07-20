import { NotFoundError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.get('/menu-by-path/:path', async (req, res) => {
    const paramSchema = z.object({ path: z.string() })
    const { path } = paramSchema.parse(req.params)

    const menu = await prisma.menu.findFirst({
      where: { path },
      include: {
        categories: {
          orderBy: { pos: 'asc' },
          include: {
            subcategories: {
              orderBy: { pos: 'asc' },
              include: {
                items: {
                  orderBy: { pos: 'asc' }
                }
              }
            }
          }
        }
      }
    })

    if (!menu)
      throw new NotFoundError('Menu not found.')

    delete (menu as any).username
    delete (menu as any).password

    return res.status(200).send({ menu })
  })
}
