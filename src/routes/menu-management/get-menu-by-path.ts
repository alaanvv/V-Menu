import { get_menu_from_path } from '../../utils/fetch-menu'
import { FastifyInstance } from 'fastify'
import { NotFoundError } from '../../errors'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.get('/menu-by-path/:path', async (req, res) => {
    const paramSchema = z.object({ path: z.string() })
    const { path } = paramSchema.parse(req.params)

    const menu: any = await get_menu_from_path(path)

    if (!menu)
      throw new NotFoundError('Menu not found.')

    delete menu.username
    delete menu.password

    return res.status(200).send({ menu })
  })
}
