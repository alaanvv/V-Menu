import { BadRequestError, NotFoundError, ForbiddenError } from '../../errors'
import { get_auth, is_trusted_ip } from '../../utils/auth'
import { FastifyInstance } from 'fastify'
import { ssr_render } from '../../utils/render'
import { get_menu } from '../../utils/fetch-menu'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.put('/menu/:id', async (req, res) => {
    const body_schema = z.object({
      name:     z.optional(z.string()),
      phone:    z.optional(z.string()),
      whatsapp: z.optional(z.string()),
      address:  z.optional(z.string()),
      footer:   z.optional(z.string()),
      single_category: z.optional(z.coerce.boolean())
    })
    const param_schema = z.object({ id: z.string().cuid() })

    const data: any = body_schema.parse(req.body)
    const { id } = param_schema.parse(req.params)

    if (data.single_category == null)
      delete data.single_category

    if (!(await get_auth(req, id)) && !(await is_trusted_ip(req)))
      throw new ForbiddenError('No privileges.')

    for (let entry of Object.entries(data))
      if (entry[1] === null)
        delete data[entry[0]]

    if (!Object.entries(data).length)
      throw new BadRequestError('Sent no data.')

    let menu: any
    try   { menu = await prisma.menu.update({ where: { id }, data }) }
    catch { throw new NotFoundError('Menu not found.') }

    delete menu.username
    delete menu.password

    ssr_render(await get_menu(menu.id))
    return res.status(204).send({ menu })
  })
}
