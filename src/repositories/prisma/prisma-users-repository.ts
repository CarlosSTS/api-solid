import { prisma } from '@/lib/prisma'
import { Prisma } from 'generated/prisma/client'
import type { UsersRepository } from '../users-repository'
import type { User } from 'generated/prisma/browser'

export class PrismaUsersRepository implements UsersRepository {
  findById(id: string): Promise<User | null> {
    const user = prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }
}
