import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().default(3333),
  TRUSTED_IPS: z.string().default('')
})

const _env = envSchema.safeParse(process.env)

if (!_env.success)
  throw new Error('Invalid environment variables', { cause: _env.error.issues })

export const env = _env.data
