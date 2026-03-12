import { prisma } from '../lib/prisma.js'

import type { User } from '../generated/prisma/client.js'
import type { CreateUserDTO, UpdateUserDTO } from '../schema/schemas.js'

const findAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany()
}

const findUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id }
  })
}

const createUser = async (data: CreateUserDTO): Promise<User> => {
  return prisma.user.create({
    data
  })
}

const updateUser = async (id: number, data: UpdateUserDTO): Promise<User | null> => {
  const user = await findUserById(id)
  if (!user) return null

  return prisma.user.update({
    where: { id },
    data
  })
}

const deleteUser = async (id: number): Promise<User | null> => {
  const user = await findUserById(id)
  if (!user) return null

  return prisma.user.delete({
    where: { id }
  })
}

export { findAllUsers, findUserById, createUser, updateUser, deleteUser }
