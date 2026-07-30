import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from 'generated/prisma/client'

import { env } from '../env'

const connectionString = env.DATABASE_URL

const schema = new URL(connectionString).searchParams.get('schema')

const adapter = new PrismaPg(
  {
    connectionString,
  },
  schema ? { schema } : {},
)

export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === 'dev' ? ['query', 'info', 'warn', 'error'] : [],
})
