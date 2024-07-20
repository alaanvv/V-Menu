import { BadRequestError, NotFoundError, ForbiddenError } from '../../errors'
import { get_menu_from_subcategory } from '../../utils/fetch-menu'
import { FastifyInstance } from 'fastify'
import { ssr_render } from '../../utils/render'
import { get_auth } from '../../utils/auth'
import { prisma } from '../../prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.put('/subcategory/:id', async (req, res) => {
    const bodySchema  = z.object({ name: z.optional(z.string()) })
    const paramSchema = z.object({ id: z.string().cuid() })

    const data = bodySchema.parse(req.body) as { [key: string]: any }
    const { id } = paramSchema.parse(req.params)

    if (!(await get_auth(req, id))) throw new ForbiddenError('No privileges.')

    for (let entry of Object.entries(data))
      if (entry[1] === null)
        delete data[entry[0]]

    if (!Object.entries(data).length)
      throw new BadRequestError('Sent no data.')

    let subcategory
    try   { subcategory = await prisma.subcategory.update({ where: { id }, data }) }
    catch { throw new NotFoundError('Subcategory not found.') }

    ssr_render(await get_menu_from_subcategory(id))
    return res.status(204).send({ subcategory })
  })
}
