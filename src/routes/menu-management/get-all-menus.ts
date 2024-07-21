import { FastifyInstance } from 'fastify'
import { ForbiddenError } from '../../errors'
import { is_trusted_ip } from '../../utils/auth'
import { prisma } from '../../prisma'

export default async function(app: FastifyInstance) {
  app.get('/menus', async (req, res) => {
    if (!(await is_trusted_ip(req)))
      throw new ForbiddenError('No privileges.')

    const menus = await prisma.menu.findMany()

    return res.status(200).send({ menus })
  })
}
