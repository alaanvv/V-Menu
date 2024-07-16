import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'

export default async function(app: FastifyInstance) {
  app.get('/menus', async (_, res) => {
    const menus = await prisma.menu.findMany()

    for (let i in menus) {
      delete (menus[i] as any).username
      delete (menus[i] as any).password
    }

    return res.status(200).send({ menus })
  })
}
