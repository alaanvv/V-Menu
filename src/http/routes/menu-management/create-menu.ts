import { FastifyInstance } from 'fastify'
import { ForbiddenError } from '../../errors'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

const TRUSTED_IPS = [
  '::ffff:127.0.0.1'
]

export default async function(app: FastifyInstance) {
  app.post('/menu', async (req, res) => {
    const bodySchema = z.object({
      username: z.string(),
      password: z.string(),
      name:     z.string(),
      phone:    z.string(),
      whatsapp: z.string(),
      address:  z.string()
    })
    const data = bodySchema.parse(req.body)

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    console.log(ip)
    if (!ip || !TRUSTED_IPS.includes(Array.isArray(ip) ? ip[0] : ip)) throw new ForbiddenError('No privileges.')

    const menu = await prisma.menu.create({ data })

    delete (menu as any).username
    delete (menu as any).password

    return res.status(201).send({ menu })
  })
}
