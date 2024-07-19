import { prisma } from '../prisma'
import { FastifyRequest } from 'fastify'

const TRUSTED_IPS = process.env.TRUSTED_IPS?.split(',') || []

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

  const session = await prisma.session.findUnique({
    where: { id: session_id },
    include: { menu: { include: { categories: { include: { subcategories: { include: { items: true } } } } } } }
  })

  if (!session) return false

  if (session.menu.id == id) return true

  for (const category of session.menu.categories) {
    if (category.id == id) return true

    for (const subcategory of category.subcategories) {
      if (subcategory.id == id) return true

      for (const item of subcategory.items)
        if (item.id == id) return true
    }
  }
}

