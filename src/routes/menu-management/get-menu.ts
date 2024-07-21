import { FastifyInstance } from 'fastify'
import { NotFoundError } from '../../errors'
import { get_menu } from '../../utils/fetch-menu'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.get('/menu/:id', async (req, res) => {
    const schema = z.object({ id: z.string().cuid() })
    const { id } = schema.parse(req.params)

    const menu: any = await get_menu(id)

    if (!menu)
      throw new NotFoundError('Menu not found.')

    delete menu.username
    delete menu.password

    return res.status(200).send({ menu })
  })
}
