import { prisma } from '@/lib/prisma'
import type { FastifyReply, FastifyRequest } from 'fastify'
import bcrypt from 'bcryptjs'
import z from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)
  const password_hash = await bcrypt.hash(password, 6)
  

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
  return reply.status(201).send()
}
