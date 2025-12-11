import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import type { Environment } from 'vitest/environments'
import { PrismaClient } from 'generated/prisma/client'

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  viteEnvironment: 'ssr',
  async setup() {
    // Create a new schema for each test environment
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL
    console.log(`databaseURL: ${databaseURL}`)
    // execSync run commands in a shell and waits for it to finish
    execSync('npx prisma migrate deploy')

    const adapter = new PrismaPg({
      connectionString: databaseURL,
    })

    const prisma = new PrismaClient({
      adapter,
    })

    return {
      async teardown() {
        // Drop the schema after the tests are done
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
