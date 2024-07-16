import { prisma } from '../../lib/prisma'
import { FastifyRequest } from 'fastify'

export async function get_auth(req: FastifyRequest, id: string) {
  const session_id = req.headers['authorization']?.split(' ')[1]

  const session = await prisma.session.findFirst({ where: { id: session_id } })
  if (!session) return

  let menu, category, subcategory, item

  // Menu
  menu = await prisma.menu.findUnique({ where: { id } })
  if (menu) return menu.id == session.menu_id

  // Category
  category = await prisma.category.findUnique({ where: { id } })
  if (category) {
    menu = await prisma.menu.findUnique({ where: { id: category.menu_id } })
    if (menu) return menu.id == session.menu_id
  }

  // Subcategory
  subcategory = await prisma.subcategory.findUnique({ where: { id } })
  if (subcategory) {
    category = await prisma.category.findUnique({ where: { id: subcategory.category_id } })
    if (category) menu = await prisma.menu.findUnique({ where: { id: category.menu_id } })
    if (menu) return menu.id == session.menu_id
  }

  // Item
  item = await prisma.item.findUnique({ where: { id } })
  if (item) {
    subcategory = await prisma.subcategory.findUnique({ where: { id: item.subcategory_id } })
    if (subcategory) category = await prisma.category.findUnique({ where: { id: subcategory.category_id } })
    if (category) menu = await prisma.menu.findUnique({ where: { id: category.menu_id } })
    if (menu) return menu.id == session.menu_id
  }
}
