import { z } from 'zod'
import 'dotenv/config'

const schema = z.object({
  NODE_ENV:     z.enum(['dev', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  HOST:         z.string().default('0.0.0.0'),
  PORT:         z.coerce.number().default(3333),
  TRUSTED_IPS:  z.string().default('')
})

const env = schema.safeParse(process.env)

if (!env.success)
  throw new Error('Invalid environment variables', { cause: env.error.issues })

export default env.data
