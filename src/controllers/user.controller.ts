import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserById,
  updateUser
} from '../services/user.service.js'

import { idSchema, updateUserSchema, userSchema } from '../schema/schemas.js'

import type { NextFunction, Request, Response } from 'express'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await findAllUsers()

    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = idSchema.parse(req.params.id)

    const response = await findUserById(id)

    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = userSchema.parse(req.body)

    const response = await createUser(data)

    return res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = idSchema.parse(req.params.id)
    const data = updateUserSchema.parse(req.body)

    const response = await updateUser(id, data)

    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = idSchema.parse(req.params.id)

    await deleteUser(id)

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

export { getAll, getById, create, update, remove }
