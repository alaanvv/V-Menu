import { NotFoundError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.get('/menu-from-session/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    const session = await prisma.session.findUnique({
      where: { id },
      include: {
        menu: {
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
        }
      }
    })

    if (!session)
      throw new NotFoundError('Session not found.')

    delete (session.menu as any).username
    delete (session.menu as any).password

    return res.status(200).send({ menu: session.menu })
  })
}
