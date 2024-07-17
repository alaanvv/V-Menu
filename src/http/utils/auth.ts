import { prisma } from '../../lib/prisma'
import { FastifyRequest } from 'fastify'

const TRUSTED_IPS = [
  '::ffff:127.0.0.1',
  '127.0.0.1',
  '192.168.1.107',
  '186.194.213.229'
]

export async function is_trusted_ip(req: FastifyRequest) {
  let ip = req.headers['x-forwarded-for']
  if (Array.isArray(ip)) ip = ip[0]
  else if (ip)           ip = ip.split(',')[0]
  else                   ip = req.socket.remoteAddress

  const allow = ip && TRUSTED_IPS.includes(Array.isArray(ip) ? ip[0] : ip)
  console.log(`Checking privileges for ${ip}: ${allow ? 'Allowing' : 'Denying'}`)

  return allow
}

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
