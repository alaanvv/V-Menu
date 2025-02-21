import { BadRequestError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/login', async (req, res) => {
    const schema = z.object({
      username: z.string(),
      password: z.string()
    })
    const data = schema.parse(req.body)

    const menu = await prisma.menu.findFirst({ where: { username: data.username, password: data.password } })
    if (!menu)
      throw new BadRequestError('Invalid credentials.')

    const session = await prisma.session.create({
      data: { menu_id: menu.id },
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

    return res.status(200).send({ session })
  })
}
