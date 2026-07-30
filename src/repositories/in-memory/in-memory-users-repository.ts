// Internal Node.js module
import { randomUUID } from 'node:crypto'
import { Prisma, type User } from 'generated/prisma/client'

import type { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  findById(id: string) {
    const user = this.items.find((item) => item.id === id)
    return Promise.resolve(user ?? null)
  }

  create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      updated_at: new Date(),
    }
    this.items.push(user)
    return Promise.resolve(user)
  }

  findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)
    return Promise.resolve(user ?? null)
  }
}
