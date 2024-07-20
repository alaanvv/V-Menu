import { get_menu_from_session } from '../../utils/fetch-menu'
import { FastifyInstance } from 'fastify'
import { NotFoundError } from '../../errors'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.get('/menu-from-session/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    const menu: any = await get_menu_from_session(id)

    if (!menu)
      throw new NotFoundError('Session not found.')

    delete menu.username
    delete menu.password

    return res.status(200).send({ menu })
  })
}
